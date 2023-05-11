import json
import logging

import firebase_admin
from django.apps import apps
from django.conf import settings

from firebase_admin import messaging, credentials
from firebase_admin.messaging import Notification


firebase_key = json.loads(settings.FIREBASE_KEY)
cred = credentials.Certificate(firebase_key)
firebase_admin.initialize_app(credential=cred)


def send_notification(title: str, msg: str, data: dict):
    logging.info(f'send notification - title: {title}; msg: {msg}')
    topic = '/topics/posts'
    message = messaging.Message(
        topic=topic,
        data=data,
        notification=Notification(
            title=title,
            body=msg,
        )
    )

    response = messaging.send(message)
    logging.info(f'Response: {response}')

def on_page_publish_receiver(sender, **kwargs):
    instance = kwargs['instance']
    latest_revision_created_at =  instance.latest_revision_created_at.replace(microsecond=0)
    first_published_at = instance.first_published_at.replace(microsecond=0)
    if latest_revision_created_at == first_published_at:
        send_notification(instance.category, instance.title, {"id": str(instance.id)})

def remove_featured_flag(sender, **kwargs):
    instance = kwargs['instance']
    if instance.featured:
        featured_blog = apps.get_model('blog', 'BlogPage').objects.filter(featured=True).exclude(id=instance.id)
        featured_blog.update(featured=False)
