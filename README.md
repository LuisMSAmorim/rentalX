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
- User must be logged to create a rental;

## Car devolution

**FR**
- Should be able to give back a car;

**BR**
- If car was gived back with less than 24 hours, must be charged a full day;
- After return, car needs to be free to another rental; 
- After return, user needs to be free to another rental; 
- After return, total value must be calculated;
- If the return time is longer than expected, a fine will be charged on the days of delay
- If there is a fine, it must be added to the total rent
- User must be logged to finish a rental;

## User's rentals listing

**FR**
- Should be able to list all rentals by user;

**BR**
- User must be logged;