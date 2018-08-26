import React, { Component } from 'react';
import './App.css';
import Course from './Course'

const IPLink = 'http://api.ipstack.com/check?access_key=df3b805c8ac6ed141ca9e04658cb8917'

class App extends Component {
  state = {
    courses: [],
    selectedCourse: null,
    country: '',
    continent:''
  }
  componentDidMount(){
    fetch('https://careerfoundry.com/en/api/courses').then(r => r.json()).then(r => this.setState({courses: Object.keys(r.courses).map(course => r.courses[course])})).then(this.fetchLocation())
  }
  fetchLocation = () => {
    fetch(IPLink)
    .then(r => r.json())
    .then(r => this.setState({country: r.country_code, continent: r.continent_code}))
  }
  setLocation = () => {
    if(this.state.country === "GB"){
      return "UK"
    }
    else if (this.state.continent === "EU" && this.state.country !== "GB"){
      return "EU"
    }
    else {
      return "NA"
    }
  }
  handleClick = course => {
    this.setState({selectedCourse: course})
  }
  handleBack = () => {
    this.setState({selectedCourse: null})
  }

  render() {
    const renderCourses = this.state.courses.map(course =>{
      return(
        <div className="course" id={course.title} value={course} onClick={(event) => this.handleClick(course)}>
          <button type="button" class="btn btn-primary responsive-width container-fluid">
            <p class="lead responsive-width">{course.title}</p>
            <p>View Course Details</p>
          </button>
        </div>
      )
    })
    return (
      <div>
      <nav class="navbar">
        <p class="navbar-brand">CAREER<strong>FOUNDRY</strong></p>
      </nav>
        <div className="App">
          {this.state.selectedCourse ? <Course selectedCourse= {this.state.selectedCourse} handleBack={this.handleBack} location={this.setLocation()}/> : <div class="container-fluid" className="courses"> {renderCourses} </div>}
        </div>
      </div>
    );
  }
}

export default App;
