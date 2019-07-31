import { general, extremelyHighQualitySound, MovieType } from './MovieType';
import { dayTimeOfWeekDay, lateShowOfWeekDay, dayTimeOfWeekEndAndHolidays, lateShowOfWeekEndAndHolidays, dayOfMovie, ScreenScheduleType } from './ScreenScheduleType';
import {
  cinemaCitizen,
  cinemaCitizenOver60,
  senior,
  universityStudent,
  highSchoolOrJuniorHighSchoolStudent,
  childOrPrimarySchoolStudent,
  handicapped,
  handicappedPartner,
  handicappedStudent,
  handicappedStudentPartner,
  miCardUser,
  parkingTicketWithDiscount80,
  CustomerType,
} from './CustomerType';

export type OrderPrice = number;
export type TicketPrice = number;
export const priceList: {
  [movieType: string]: {
    [scheduleType: string]: {
      [customerType: string]: TicketPrice
    }
  }
} = {
  [general]: {
    [dayTimeOfWeekDay]: {
      [cinemaCitizen]: 1000,
      [cinemaCitizenOver60]: 1000,
      [general]: 1800,
      [senior]: 1100,
      [universityStudent]: 1500,
      [highSchoolOrJuniorHighSchoolStudent]: 1000,
      [childOrPrimarySchoolStudent]: 1000,
      [handicapped]: 1000,
      [handicappedPartner]: 1000,
      [handicappedStudent]: 900,
      [handicappedStudentPartner]: 900,
      [miCardUser]: 1600,
      [parkingTicketWithDiscount80]: 1400
    },
    [lateShowOfWeekDay]: {
      [cinemaCitizen]: 1000,
      [cinemaCitizenOver60]: 1000,
      [general]: 1300,
      [senior]: 1100,
      [universityStudent]: 1300,
      [highSchoolOrJuniorHighSchoolStudent]: 1000,
      [childOrPrimarySchoolStudent]: 1000,
      [handicapped]: 1000,
      [handicappedPartner]: 1000,
      [handicappedStudent]: 900,
      [handicappedStudentPartner]: 900,
      [miCardUser]: 1300,
      [parkingTicketWithDiscount80]: 1100
    },
    [dayTimeOfWeekEndAndHolidays]: {
      [cinemaCitizen]: 1300,
      [cinemaCitizenOver60]: 1000,
      [general]: 1800,
      [senior]: 1100,
      [universityStudent]: 1500,
      [highSchoolOrJuniorHighSchoolStudent]: 1000,
      [childOrPrimarySchoolStudent]: 1000,
      [handicapped]: 1000,
      [handicappedPartner]: 1000,
      [handicappedStudent]: 900,
      [handicappedStudentPartner]: 900,
      [miCardUser]: 1600,
      [parkingTicketWithDiscount80]: 1400
    },
    [lateShowOfWeekEndAndHolidays]: {
      [cinemaCitizen]: 1000,
      [cinemaCitizenOver60]: 1000,
      [general]: 1300,
      [senior]: 1100,
      [universityStudent]: 1300,
      [highSchoolOrJuniorHighSchoolStudent]: 1000,
      [childOrPrimarySchoolStudent]: 1000,
      [handicapped]: 1000,
      [handicappedPartner]: 1000,
      [handicappedStudent]: 900,
      [handicappedStudentPartner]: 900,
      [miCardUser]: 1300,
      [parkingTicketWithDiscount80]: 1100
    },
    [dayOfMovie]: {
      [cinemaCitizen]: 1100,
      [cinemaCitizenOver60]: 1000,
      [general]: 1100,
      [senior]: 1100,
      [universityStudent]: 1100,
      [highSchoolOrJuniorHighSchoolStudent]: 1000,
      [childOrPrimarySchoolStudent]: 1000,
      [handicapped]: 1000,
      [handicappedPartner]: 1000,
      [handicappedStudent]: 900,
      [handicappedStudentPartner]: 900,
      [miCardUser]: undefined,
      [parkingTicketWithDiscount80]: undefined
    }
  },
  [extremelyHighQualitySound]: {
    [dayTimeOfWeekDay]: {
      [cinemaCitizen]: 1000,
      [cinemaCitizenOver60]: 1000,
      [general]: 1800,
      [senior]: 1100,
      [universityStudent]: 1500,
      [highSchoolOrJuniorHighSchoolStudent]: 1000,
      [childOrPrimarySchoolStudent]: 1000,
      [handicapped]: 1000,
      [handicappedPartner]: 1000,
      [handicappedStudent]: 900,
      [handicappedStudentPartner]: 900,
      [miCardUser]: 1600,
      [parkingTicketWithDiscount80]: 1400
    },
    [lateShowOfWeekDay]: {
      [cinemaCitizen]: 1000,
      [cinemaCitizenOver60]: 1000,
      [general]: 1800,
      [senior]: 1100,
      [universityStudent]: 1500,
      [highSchoolOrJuniorHighSchoolStudent]: 1000,
      [childOrPrimarySchoolStudent]: 1000,
      [handicapped]: 1000,
      [handicappedPartner]: 1000,
      [handicappedStudent]: 900,
      [handicappedStudentPartner]: 900,
      [miCardUser]: 1600,
      [parkingTicketWithDiscount80]: 1400
    },
    [dayTimeOfWeekEndAndHolidays]: {
      [cinemaCitizen]: 1300,
      [cinemaCitizenOver60]: 1000,
      [general]: 1800,
      [senior]: 1100,
      [universityStudent]: 1500,
      [highSchoolOrJuniorHighSchoolStudent]: 1000,
      [childOrPrimarySchoolStudent]: 1000,
      [handicapped]: 1000,
      [handicappedPartner]: 1000,
      [handicappedStudent]: 900,
      [handicappedStudentPartner]: 900,
      [miCardUser]: 1600,
      [parkingTicketWithDiscount80]: 1400
    },
    [lateShowOfWeekEndAndHolidays]: {
      [cinemaCitizen]: 1300,
      [cinemaCitizenOver60]: 1000,
      [general]: 1800,
      [senior]: 1100,
      [universityStudent]: 1500,
      [highSchoolOrJuniorHighSchoolStudent]: 1000,
      [childOrPrimarySchoolStudent]: 1000,
      [handicapped]: 1000,
      [handicappedPartner]: 1000,
      [handicappedStudent]: 900,
      [handicappedStudentPartner]: 900,
      [miCardUser]: 1600,
      [parkingTicketWithDiscount80]: 1400
    },
    [dayOfMovie]: {
      [cinemaCitizen]: 1100,
      [cinemaCitizenOver60]: 1000,
      [general]: 1100,
      [senior]: 1100,
      [universityStudent]: 1100,
      [highSchoolOrJuniorHighSchoolStudent]: 1000,
      [childOrPrimarySchoolStudent]: 1000,
      [handicapped]: 1000,
      [handicappedPartner]: 1000,
      [handicappedStudent]: 900,
      [handicappedStudentPartner]: 900,
      [miCardUser]: undefined,
      [parkingTicketWithDiscount80]: undefined
    }
  }
}