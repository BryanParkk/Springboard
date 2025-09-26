
interface UserInterface {
    name: string;
    email: string;
    age?: number;
}

function LogIn(user: UserInterface) {}

interface Employee extends UserInterface {
    salary: number;
    employeeId: number;
    isManager: boolean;
}

function fireEmployee(emp: Employee) {}

fireEmployee({name: "John", email: "google@gmaill.com", salary: 20000, employeeId: 232323, isManager: true});

console.log(fireEmployee.name);

//////////////////////////
