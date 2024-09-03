let express = require("express");
let app = express();
const PORT = 3000;

let { student } = require("./models/student.model");
let { course } = require("./models/course.model");
let { studentCourse } = require("./models/studentCourse.model");
let { sequelize } = require("./lib/index");

app.use(express.json());

let coursesData = [
  { title: "Math 101", description: "Basic Mathematics" },
  { title: "History 201", description: "World History" },
  { title: "Science 301", description: "Basic Sciences" },
];

let studentsData = [{ name: "John Doe", age: 24 }];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await student.bulkCreate(studentsData);
    await course.bulkCreate(coursesData);

    res.status(200).json({ message: "DataBase seeding successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

/**
 * Fetch all students
 */
async function fetchAllStudents() {
  let students = await student.findAll();
  return { students: students };
}
app.get("/students", async (req, res) => {
  try {
    let response = await fetchAllStudents();
    if (response.students.length === 0) {
      return res.status(404).json({ message: "No students found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 *  Fetch all courses
 */
async function fetchAllCourses() {
  let courses = await course.findAll();
  return { courses: courses };
}
app.get("/courses", async (req, res) => {
  try {
    let response = await fetchAllCourses();
    if (response.courses.length === 0) {
      return res.status(404).json({ message: "No courses found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 1: Create New Student
 * Create an endpoint /students/new that will create a new student record in the database.
 */
async function addNewStudent(newStudentData) {
  let newStudent = await student.create(newStudentData);
  return { newStudent };
}
app.post("/students/new", async (req, res) => {
  try {
    let newStudent = req.body.newStudent;
    let response = await addNewStudent(newStudent);
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Update Student by ID
 * Create an endpoint /students/update/:id that will update an existing student record by ID.
 */
async function updateStudentById(updatedStudentData, id) {
  let studentDetails = await student.findOne({ where: { id } });
  if (!studentDetails) {
    return {};
  }
  studentDetails.set(updatedStudentData);
  let updatedStudent = await studentDetails.save();
  return { message: "Student updated successfully", updatedStudent };
}
app.post("/students/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let newStudentData = req.body;
    let response = await updateStudentById(newStudentData, id);
    if (!response.message) {
      return res.status(404).json({ message: "Student not found!" });
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
