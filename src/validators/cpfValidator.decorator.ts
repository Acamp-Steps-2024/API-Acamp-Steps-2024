import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'cpfValidator', async: false })
export class CpfValidatorConstraint implements ValidatorConstraintInterface {
  validate(cpf: string, args: ValidationArguments) {
    return cpfValidator.isValid(cpf);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid CPF provided.';
  }
}

export function IsValidCpf(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CpfValidatorConstraint,
    });
  };
}