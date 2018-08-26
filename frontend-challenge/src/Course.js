import React from 'react'


export default class Course extends React.Component{
  constructor(){
    super()
    this.state = {
      startDates: [],
      prices:[]
    }
  }
  componentDidMount(){
    fetch('https://careerfoundry.com/en/api/courses/' + this.props.selectedCourse.url.split('/')[5]).then(r => r.json()).then(r => this.setState({
      startDates: r.start_dates.filter(date => Date.parse(date.split(' ')[1] + parseInt(date.split(' ')[2]).toString() + ',' + date.split(' ')[3]) >= Date.now()),
      prices: r.price[this.props.location]}))
  }
  render(){
    const renderDates = this.state.startDates.slice(0,3).map(date => {
      return (
        <div id={date}>
          {date}
        </div>
      )
    })
    return(
      <div>
      <h1>{this.props.selectedCourse.title}</h1>
      <div class="container-fluid" className="course-details">
          <div className="start-date">
            <h2>Start Dates:</h2>
            {renderDates}
          </div>
          <div id="price">
            <h2>Price:</h2>
               <p><strong>All Upfront</strong> : {this.state.prices.all_upfront}</p>
               <p><strong>Installments</strong>: {this.state.prices.upfront} with {this.state.prices.cycles} payments of {this.state.prices.installment} ({this.state.prices.total} total)</p>
               <p><strong>Upfront Savings</strong> : {this.state.prices.upfront_savings}</p>
          </div>
      </div>
      <button type="button" class="btn btn-primary" onClick={this.props.handleBack}>Back</button>
      </div>
    )
  }
}
