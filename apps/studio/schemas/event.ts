import { defineType } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bandCurfew',
      title: 'Band Curfew',
      type: 'datetime',
      description: 'When the band must stop playing',
    },
    {
      name: 'barCloses',
      title: 'Bar Closes',
      type: 'datetime',
      description: 'When the bar closes',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'eventDescription',
      title: 'Event Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'colorCode',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Interne arrangement', value: 'IA' },
          { title: 'DJ-arrangement', value: 'DJ' },
          { title: 'Internfest', value: 'IF' },
          { title: 'Konsert', value: 'K' },
          { title: 'Mattisøkt', value: 'M' },
          { title: 'Styremøter', value: 'S' },
          { title: 'Ubekreftet', value: 'U' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'displayColor',
      title: 'Display Color',
      type: 'color',
      description: 'Color for calendar display (auto-set based on event type)',
      readOnly: true,
      initialValue: { hex: '#3174ad' },
    },
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      colorCode: 'colorCode',
    },
    prepare(selection) {
      const { title, startDate, colorCode } = selection;
      const date = startDate ? new Date(startDate).toLocaleDateString() : 'No date';
      return {
        title: title,
        subtitle: `${colorCode ? `[${colorCode}] ` : ''}${date}`,
      };
    },
  },
});