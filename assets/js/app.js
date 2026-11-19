const currentPage = window.location.pathname.split("/").pop();

if (
    currentPage !== "index.html" &&
    localStorage.getItem("loggedIn") !== "true"
) {
    window.location.href = "index.html";
}
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorMessage = document.getElementById("errorMessage");

        if (username === "admin" && password === "admin123") {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "dashboard.html";
        } else {
            errorMessage.textContent = "Invalid username or password.";
        }
    });
}

const studentTable = document.getElementById("studentTable");

if (studentTable && typeof students !== "undefined") {
    studentTable.innerHTML = students.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.programme}</td>
            <td>${student.gpa.toFixed(2)}</td>
        </tr>
    `).join("");
}

const courseTable = document.getElementById("courseTable");

if (courseTable && typeof courses !== "undefined") {
    courseTable.innerHTML = courses.map(course => `
        <tr>
            <td>${course.id}</td>
            <td>${course.name}</td>
            <td>${course.credit}</td>
            <td>${course.faculty}</td>
        </tr>
    `).join("");
}

const resultTable = document.getElementById("resultTable");

if (resultTable && typeof results !== "undefined") {
    resultTable.innerHTML = results.map(result => {
        const status = ["D", "F"].includes(result.grade)
            ? "Failed"
            : "Passed";

        const badgeClass = status === "Failed"
            ? "bg-danger"
            : "bg-success";

        return `
            <tr>
                <td>${result.studentId}</td>
                <td>${result.course}</td>
                <td>${result.grade}</td>
                <td>${result.gpa.toFixed(2)}</td>
                <td>
                    <span class="badge ${badgeClass}">${status}</span>
                </td>
            </tr>
        `;
    }).join("");
}

const gradeCanvas = document.getElementById("gradeChart");

if (gradeCanvas && typeof results !== "undefined") {
    const gradeLabels = ["A", "A-", "B+", "B", "C+", "C", "D", "F"];

    const gradeCounts = gradeLabels.map(grade =>
        results.filter(result => result.grade === grade).length
    );

    new Chart(gradeCanvas, {
        type: "doughnut",
        data: {
            labels: gradeLabels,
            datasets: [{
                data: gradeCounts,
                backgroundColor: [
                    "#8b5cf6", // A - Purple
                    "#3b82f6", // A- - Blue
                    "#14b8a6", // B+ - Teal
                    "#22c55e", // B - Green
                    "#eab308", // C+ - Yellow
                    "#f97316", // C - Orange
                    "#ea580c", // D - Dark Orange
                    "#dc2626"  // F - Red
                ],
                borderWidth: 2,
                borderColor: "#ffffff"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

const gpaCanvas = document.getElementById("gpaChart");

if (gpaCanvas && typeof students !== "undefined") {
    new Chart(gpaCanvas, {
        type: "bar",
        data: {
            labels: students.map(student => student.name),
            datasets: [{
                label: "Student GPA",
                data: students.map(student => student.gpa),
                backgroundColor: "#3b82f6"
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4
                }
            }
        }
    });
}

const totalStudents = document.getElementById("totalStudents");
const totalCourses = document.getElementById("totalCourses");
const averageGPA = document.getElementById("averageGPA");

if (typeof students !== "undefined") {
    if (totalStudents) {
        totalStudents.textContent = students.length;
    }

    if (averageGPA) {
        const average = students.reduce(
            (sum, student) => sum + student.gpa, 0
        ) / students.length;

        averageGPA.textContent = average.toFixed(2);
    }
}

if (typeof courses !== "undefined" && totalCourses) {
    totalCourses.textContent = courses.length;
}

const performanceCanvas = document.getElementById("performanceChart");

if (performanceCanvas && typeof students !== "undefined") {
    new Chart(performanceCanvas, {
        type: "bar",
        data: {
            labels: students.map(student => student.name),
            datasets: [{
                label: "Student GPA",
                data: students.map(student => student.gpa),
                backgroundColor: "#3b82f6"
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4
                }
            }
        }
    });
}
