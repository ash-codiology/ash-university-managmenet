#! /usr/bin/env node
class Person{
  name : string;
  age: number;

  constructor(name:string,age:number){
   this.name = name;
   this.age = age;
  }
  tostring():string{
      return `Person {name: ${this.name}, age: ${this.age}}`
  }
}

class Student extends Person{
  rollno:number;
  courses:Course[] = [];

  constructor(name:string,age:number,rollno:number){
      super(name,age)
      this.rollno = rollno;
  }
  registerForCourse(course:Course):void{
  this.courses.push(course)
  course.AddStudent(this);
  }
  tostring(): string {
      return` Student {name: ${this.name}, age: ${this.age}, rollno: ${this.rollno}, courses: [${this.courses.map(course => course.name).join(",")}}`
  }
}

class Instructor extends Person{
  salary:number;
  courses:Course[]=[];

  constructor(name:string,age:number,salary:number){
      super(name,age);
      this.salary = salary;
  }
  assignCourse(course:Course):void{
  this.courses.push(course);
  course.setInstructor(this);
  
  }
  tostring(): string {
      return`Instructor {name: ${this.name}, age: ${this.age}, salary: ${this.salary}, courses: [${this.courses.map(course => course.name).join(",")}]}`
  }
}

class Course{
  id:number;
  name:string;
  student:Student[] = [];
  instructors:Instructor | null = null;

  constructor(id:number,name:string,){
  this.id = id;
  this.name = name;
  }
  AddStudent(student:Student):void{
      this.student.push(student);
  }
  setInstructor(instructor: Instructor):void{ 
      this.instructors = instructor;
  }
  tostring():string{
      return `Course {id: ${this.id}, name: ${this.name}, student: [${this.student.map(student => student.name).join(",")}], instructor: ${this.instructors?.name?? "none"}}`
  }
}

class Department{
  name:string;
  courses:Course[] = [];

  constructor(name:string){
  this.name = name;
  }
  AddCourse(course:Course):void{
      this.courses.push(course)
  }
  tostring():string{
      return `Department {name: ${this.name}, courses: [${this.courses.map(course => course.name).join(",")}]}`
  }
}

const student1 = new Student("aisha",18,1000);
const student2 = new Student("Ahmed",30,1001);
const student3 = new Student("fatima",26,1002);

const instructor1 = new Instructor("Hamzah",23,5000000);
const instructor2 = new Instructor("Asharib",22,3000000);
const instructor3 = new Instructor("Okasha",20,1000000);

const course1 = new Course(1,"Artifical Intelligence");
const course2 = new Course(2,"Metaverse");
const course3 = new Course(3,"Blockchain");


student1.registerForCourse(course1);
student2.registerForCourse(course2);
student3.registerForCourse(course3);

instructor1.assignCourse(course1);
instructor2.assignCourse(course2);
instructor1.assignCourse(course3);

const department1 = new Department("Department of Computer Science");
const department2 = new Department("Department of Digital Media");
const department3 = new Department("Department of Information System");

department1.AddCourse(course1);
department2.AddCourse(course2);
department3.AddCourse(course3);

console.log(department1.courses[0].tostring());
console.log(instructor1.courses.map(course => course.tostring()));
console.log(student1.courses[0].tostring());
console.log(course3.student.map(student => student.tostring()));
console.log(student1.courses.map(course => course.tostring()));

console.log("All Instructors");
console.log(instructor1.tostring());
console.log(instructor2.tostring());
console.log(instructor3.tostring());

console.log("All Students");
console.log(student1.tostring());
console.log(student2.tostring());
console.log(student3.tostring());