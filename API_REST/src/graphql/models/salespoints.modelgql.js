const mongoose = require('mongoose');

/**
 * Address Schema
 */
const addressSchema = new mongoose.Schema(
  {
    number: {
      type: mongoose.Schema.Types.String,
      required: false
    },
    street: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    city: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    postalCode: {
      type: mongoose.Schema.Types.Number,
      required: true
    },
    country: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    longitude: {
      type: mongoose.Schema.Types.Number,
      required: true
    },
    latitude: {
      type: mongoose.Schema.Types.Number,
      required: true
    }
  }
);

/**
 * Schedule Schema
 */
const scheduleSchema = new mongoose.Schema(
  {
    openingHour: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    closingHour: {
      type: mongoose.Schema.Types.String,
      required: true
    }
  }
);

/**
 * DailySchedule Schema
 */
const dailyScheduleSchema = new mongoose.Schema(
  {
    weekDay: {
      type: mongoose.Schema.Types.String,
      enum: [
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURSDAY',
        'SUNDAY'
      ],
      required: true
    },
    schedule: {
      type: [scheduleSchema],
      minItems: 1,
      required: true
    }
  }
);

/**
 * salesPoint Schema
 */
const salesPointSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    address: {
      type: addressSchema,
      required: false
    },
    schedule: {
      type: [dailyScheduleSchema],
      minItems: 1,
      maxItems: 7,
      required: false
    }
  }
);

/**
 * @typedef salespoints
 */

module.exports = mongoose.model('salespoints', salesPointSchema);
