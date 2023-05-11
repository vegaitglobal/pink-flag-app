from django.db import models

from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField


class DonationPage(Page):
    max_count = 1

    image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    body = RichTextField(features=['bold', 'italic', 'link', 'ul'])
    copy_text = models.CharField(max_length=250, null=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('image'),
        FieldPanel('body'),
        FieldPanel('copy_text'),
    ]

    api_fields = [
        APIField('body'),
        APIField('image'),
        APIField('copy_text'),
    ]
