import React, { Component } from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      course: "",
    };

    this.handleSubmitCourse = this.handleSubmitCourse.bind(this);
  }

  handleSubmitCourse(event) {
    alert("Your selected value is: " + this.state.course);
    event.preventDefault();
  }

  handleChangeCourse = (event) => {
    this.setState({ course: event.target.value });
  };

  getUnique(arr, comp) {
    const unique = arr
      //store the comparison values in array
      .map((e) => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter((e) => arr[e])

      .map((e) => arr[e]);

    return unique;
  }

  // componentDidMount() {
  //   const courses = require("./courses.json");
  //   this.setState({ courses: courses });
  // }

  componentDidMount() {
    fetch("https://restcountries.com/v2/all").then((resp) => {
      resp.json().then((courses) => {
        // console.warn (result)
        this.setState({ courses: courses });
      });
    });
  }

  render() {
    const uniqueCouse = this.getUnique(this.state.courses, "tag");

    const courses = this.state.courses;
    const course = this.state.course;

    const filterDropdown = courses.filter(function (result) {
      return result.name === course;
    });

    return (
      <div>
        <form onSubmit={this.handleSubmitCourse}>
          <br />
          <br />
          <label>
            Looping through Courses tag from Json File
            <select
              value={this.state.course}
              onChange={this.handleChangeCourse}
            >
              {this.state.courses.map((course) => (
                <option key={course.name} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </label>
          <input type="submit" value="Submit" />
          <div>
            {filterDropdown.map((course) => (
              <div key={course.name} style={{ margin: "10px" }}>
                <div id="flag-container">
                  <img src={course.flags} alt="" />
                </div>
                <label>Name: {course.name}</label>
                <br />
                <label>region: {course.region}</label>
                <br />
                <label>population: {course.population}</label>
                <br />
                <label>capital: {course.capital}</label>
                <br />
                <label>currencies: {course.currencies[1]}</label>
                <br />
              </div>
            ))}
          </div>
        </form>
      </div>
    );
  }
}

export default App;
