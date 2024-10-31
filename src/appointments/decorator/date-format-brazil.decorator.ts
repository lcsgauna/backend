import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class isBrazilDateFormatConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any) {
    if (typeof value !== 'string') return false;

    const brazilDateFormat =
      /^([0-2][0-9]|(3)[0-1])\/([0][1-9]|(1)[0-2])\/\d{4} ([0-1][0-9]|(2)[0-3]):[0-5][0-9]$/;

    return brazilDateFormat.test(value);
  }

  defaultMessage(): string {
    return `A data deve estar no formato "dd/MM/yyyy HH:mm" `;
  }
}

export function isBrazilDateFormat(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: isBrazilDateFormatConstraint,
    });
  };
}
