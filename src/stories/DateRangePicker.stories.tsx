import { Meta, StoryObj } from '@storybook/react'
import DateRangePicker from "../components/DateRangePicker/index";
import { DateRangePickerProps as DateRangePickerProps } from '../components/DateRangePicker/types';

const meta: Meta<DateRangePickerProps> = {
  title: 'UIComponents/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    fromDate: {
        control: {
            type: 'date'
        }
    },
    startDateLabel: {
      control: {
        type: 'text'
      }
    },
    toDate: {
        control: {
            type: 'date'
        }
    },
    endDateLabel: {
      control: {
        type: 'text'
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
    numberOfMonths: {
      control: {
        type: 'number'
      }
    }
  },
};
  
export default meta;

type Story = StoryObj<DateRangePickerProps>



export const Primary: Story = {
  args: {
    startDateLabel: "Start",
    endDateLabel: "End",
    numberOfMonths: 2,
  },
  render: ({ ...args }) => {
    return <div>
      <DateRangePicker {...args}></DateRangePicker>
      </div>
  },
};

export const DoublePagedCalendar: Story = {
  args: {
    startDateLabel: "Start",
    endDateLabel: "End",
  },
  render: ({ ...args }) => {
    return <div>
      <DateRangePicker {...args}></DateRangePicker>
      </div>
  },
};

