import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

export const Match = <T>(
  property: (o: T) => any,
  validationOptions?: ValidationOptions,
) => {
  return (object: T, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'MatchConstraint' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [fn] = args.constraints;
    return fn(args.object) === value;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const [constraintProperty]: (() => any)[] = validationArguments.constraints;
    const [, propertyName] = constraintProperty.toString().split('.');
    return `${propertyName} and ${validationArguments.property} does not match`;
  }
}
