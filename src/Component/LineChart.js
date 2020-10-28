import React, { Component } from 'react'
import * as d3 from 'd3'
import styles from '../styles/line_chart.module.scss'
export class LineChart extends Component{
	constructor(props){
		super(props)
		this.state = {
			data: [26, 27, 28, 29, 34, 31, 28]
		}
		this.ref = null;
		window.addEventListener('resize', this.reDrawChart)
	}

	setRef = (element) => {
		this.ref = element;
		this.reDrawChart()
	}

	reDrawChart = () => {
		this.drawChart()
	}

	drawChart = () =>{
		let { data, minTemp, maxTemp, minTime, maxTime } = this.props
		d3.selectAll(".graph> *").remove()
		let margin = {
			top: 30,
			left: 30,
			right: 30,
			bottom: 30
		}
		let width = document.querySelector('.graph').offsetWidth;
		width = width - margin.left - margin.right
		let height = 100;
		var xScale = d3.scaleTime()
						  .domain([new Date(minTime*1000), new Date(maxTime*1000)])
						  .nice(d3.timeDay)
						  .range([0, width])
		
		var yScale = d3.scaleLinear()
						.domain([minTemp, maxTemp])
						.range([height, 0])
		
		const area = d3.area()
					   .x(function(d,i){ 
							return xScale(new Date(d.time*1000))
							})
					   .y0(height)
				       .y1(function(d, i) { return yScale(d.temp)})
					   .curve(d3.curveMonotoneX);
		
		const line = d3.line()
					 .x(function(d,i){
						return xScale(new Date(d.time*1000))
						})
					 .y(function(d, i) {
						 return yScale(d.temp)})
					 .curve(d3.curveMonotoneX);

		
		var svg = d3.select('.graph')
					.append('svg')
					.attr("width", width+margin.left + margin.right)
					.attr('height', height+margin.top + margin.bottom)
					.append("g")
					.attr('transform', "translate(" + margin.left +", "+ margin.left + ")")

					svg.append("g")
					   .attr("class", "x axis")
					   .attr("transform", `translate(0, ${height})`)
					   .call(
						   d3
						   .axisBottom(xScale)
						   .ticks(5)
						   .tickSize(-height)
						   )
					
					svg.append('g')
					   .attr("class", "y axis")
					   .call(d3.axisLeft(yScale))
					
					svg.append("path")
					   .datum(data)
					   .attr('fill', 'none')
					   .attr('stroke', '#1a73e8')
    				   .attr('stroke-width', 2)
					   .attr("class", 'line')
					   .attr("d", line)
					
					   svg.append("path")
					   .datum(data)
					   .attr('fill', '#1a73e8')
					   .attr('opacity', '0.2')
					   .attr('stroke', '#1a73e8')
    				   .attr('stroke-width', 2)
					   .attr("class", 'line')
					   .attr("d", area)

	}			

	componentWillUnmount(){
		window.removeEventListener('resize', this.reDrawChart);
	}
	render(){
		return(
			<div ref={this.setRef} className={[styles.container, "graph"].join(" ")}>
			</div>
		)
	}
}