**Functional Requeriments => FR**;

**Non Functional Requeriments => NFR**;

**Bussiness Rules => BR**;

## Cars registration

**FR**
- Should be able to register a new car;

**BR**
- Should not be able to register a car with a license plate already registered;
- The car must be available for default;
- The car must be registered by an admin;

## Cars listing

**FR**
- Should be able to list all available cars;
- Should be able to list all cars by category name;
- Should be able to list all cars by brand name;
- Should be able to list all cars by car name;

**BR**
- User not needs to be logged in system;

## Cars specifications registration

**FR**
- Should be able to register a specification to a car;
- The specification must be registered by an admin;

**BR**
- The cars must be registered;
- Should not be able to register a non-existent specification to a car;

## Cars image registration

**FR**
- Should be able to register a new car image;
- Should be able to list all cars;

**NFR**
- Use Multer to uploads;

**BR**
- The user should be able to register many images to a car;
- The imagem must be registered by an admin;

## Car rental

**FR**
- Should be able to register a rental;

**BR**
- The rental must have minimum duration of 24 hours;
- Should not be able to register a new rental if user already have a current one;
- Should not be able to register a new rental if car are already rented;