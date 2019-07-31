import { Tickets } from '../../domain/model/Tickets';
import { OrderDetail } from './view_model/OrderDetail';
import {
  general,
  cinemaCitizen,
  cinemaCitizenOver60,
  senior,
  highSchoolOrJuniorHighSchoolStudent,
  universityStudent,
  childOrPrimarySchoolStudent,
  handicapped,
  handicappedPartner,
  handicappedStudent,
  handicappedStudentPartner,
  miCardUser,
  parkingTicketWithDiscount80,
  CustomerType
} from '../../domain/model/CustomerType';

export class CalculateAmountOfTicketsPresenter {
  convert(tickets: Tickets): OrderDetail {
    return {
      tickets: tickets.tickets.map(ticket => {
        return {
          customerType: this.toVisibleCustomerType(ticket.customer.kindOf()),
          price: ticket.calculatePrice(),
        };
      }),
      amountOfPrice: tickets.calculatePrice()
    }

  }
  private toVisibleCustomerType(customerType: CustomerType): string {
    const names = {
      [cinemaCitizen]: 'シネマシチズン',
      [cinemaCitizenOver60]: 'シネマシチズン(60才以上)',
      [general]: '一般',
      [senior]: 'シニア(70才以上)',
      [universityStudent]: '学生(大, 専)',
      [highSchoolOrJuniorHighSchoolStudent]: '中, 高校生',
      [childOrPrimarySchoolStudent]: '幼児(3才以上), 小学生',
      [handicapped]: '障がい者(学生以上)',
      [handicappedPartner]: '障がい者(学生以上)同伴者',
      [handicappedStudent]: '障がい者(高校生以下)',
      [handicappedStudentPartner]: '障がい者(高校生以下)同伴者',
      [miCardUser]: 'エムアイカード',
      [parkingTicketWithDiscount80]: '駐車場パーク80割引',
    };
    return names[customerType];
  }
}