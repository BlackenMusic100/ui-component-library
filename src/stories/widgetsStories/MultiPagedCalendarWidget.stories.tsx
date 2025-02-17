import { Meta, StoryObj } from '@storybook/react'
import MultiPagedCalendarWidget from "../../widgets/MultiPagedCalendarWidget/index";
import { MultiPagedCalendarWidgetProps } from '../../widgets/MultiPagedCalendarWidget/types';

const meta: Meta<MultiPagedCalendarWidgetProps> = {
  title: 'Widgets/MultiPagedCalendarWidget',
  component: MultiPagedCalendarWidget,
  tags: ['autodocs'],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    numberOfMonths: {
        control: {
            type: 'number'
        }
    },
    minDate: {
        control: {
            type: 'date'
        }
    },
    maxDate: {
        control: {
            type: 'date'
        }
    },
  },
};
  
export default meta;

type Story = StoryObj<MultiPagedCalendarWidgetProps>


export const Primary: Story = {
  args: {
    numberOfMonths: 2
  },
  render: ({ ...args }) => {
    return <div>
      <MultiPagedCalendarWidget {...args}></MultiPagedCalendarWidget>
      </div>
  },
};
