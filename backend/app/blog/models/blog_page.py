from django.db import models
from wagtail.models import Page
from wagtail.fields import StreamField
from wagtail.admin.panels import FieldPanel
from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtail.api import APIField
from wagtail.signals import page_published
from blog.signals import on_page_publish_receiver, remove_featured_flag


class BlogPage(Page):

    choices = (
        ("VESTI", "VESTI"),
        ("BLOG", "BLOG"),
    )

    category = models.CharField(max_length=10, choices=choices)
    image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    body = StreamField([
        ('paragraph', blocks.RichTextBlock(features=['bold', 'italic', 'link', 'ul'])),
        ('image', ImageChooserBlock()),
    ], use_json_field=True)

    featured = models.BooleanField(default=False)
    author = models.CharField(max_length=255, null=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('featured'),
        FieldPanel('category'),
        FieldPanel('image'),
        FieldPanel('body'),
        FieldPanel('author'),
    ]

    subpage_types = ('blog.BlogPage',)

    api_fields = [
        APIField('body'),
        APIField('category'),
        APIField('image'),
        APIField('featured'),
        APIField('author'),
    ]




page_published.connect(on_page_publish_receiver, sender=BlogPage)
page_published.connect(remove_featured_flag, sender=BlogPage)
