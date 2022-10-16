import logging
from django.apps import apps

# from firebase_admin import messaging

def send_notification(title: str, msg: str):
    logging.warning(msg)
    topic = 'projects/pink-flag/topics/posts'
  #  message = messaging.Message(
  #          notification=messaging.Notification(
  #          title=title,
  #          body=msg
  #      ),
  #      topic=topic
  #  )

def on_page_publish_receiver(sender, **kwargs):
    instance = kwargs['instance']
    latest_revision_created_at =  instance.latest_revision_created_at.replace(microsecond=0)
    first_published_at = instance.first_published_at.replace(microsecond=0)
    if latest_revision_created_at == first_published_at:
        send_notification(instance.category, instance.title)
def remove_featured_flag(sender, **kwargs):
    instance = kwargs['instance']
    if instance.featured:
        featured_blog = apps.get_model('blog', 'BlogPage').objects.filter(featured=True).exclude(id=instance.id)
        featured_blog.update(featured=False)