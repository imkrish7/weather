import React, { Component } from 'react'
import * as d3 from 'd3'
import styles from '../styles/line_chart.module.scss'
export class AreaChart extends Component{
	constructor(props){
		super(props)
		this.state = {
			data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
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
		d3.selectAll(".graph_area > *").remove()
		let margin = {
			top: 30,
			left: 30,
			right: 30,
			bottom: 30
		}
		let width = document.querySelector('.graph_area').offsetWidth;
		width = width - margin.left - margin.right
		let height = 80;
		let n = this.state.data.length;

		var xScale = d3.scaleLinear()
						.domain([0, n-1])
						.range([0, width])
		
		var yScale = d3.scaleLinear()
						.domain([25, 34])
						.range([height, 0])
						
		
		const area = d3.area()
					.x(function(d,i){ 
						return xScale(i)
						})
					.y0(height)
					.y1(function(d, i) { return yScale(d)})
					.curve(d3.curveMonotoneX);
		
		const arc = d3.arc()
					  .outerRadius(50)
					  .startAngle(10)
					  .endAngle(function(d){
						console.log(d)	   
						return (d / 24 ) * 2 * Math.PI;
					} )

		const line = d3.line()
					 .x(function(d,i){ 
						return xScale(i)
						})
					 .y(function(d, i) { return yScale(d)})
					 .curve(d3.curveMonotoneX);

		
		var svg = d3.select('.graph_area')
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
						   .ticks(4)
						   .tickSize(20)
						)
					
					svg.append('g')
					   .attr("class", "y axis")
					   .call(d3.axisLeft(yScale))
					
					svg.append("path")
					   .datum(this.state.data)
					   .enter()
					   .attr('fill', '#d35400')
					   .attr('stroke', '#d35400')
    				   .attr('stroke-width', 2)
					   .attr("class", 'line')
					   .attr("d", arc)

	}			

	componentWillUnmount(){
		window.removeEventListener('resize', this.reDrawChart);
	}
	render(){
		return(
			<div ref={this.setRef} className={[styles.container, "graph_area"].join(" ")}>
			</div>
		)
	}
}