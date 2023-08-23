import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'



export class News extends Component {

  static defaultProps = {
    country: 'ma',
    pageSize: 8,
    category:"general"
  }

  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  
  constructor(props){
    super(props);
    console.log("Hello peeps! constructor here again")
    this.state={
      articles : [],
      page:1,
      loading:false
    }
    document.title=`DailyPress - ${this.props.category}`
  }


  // this async function here is for that - it waits for the promise to resolve.
  async componentDidMount(){
    this.props.setProgress(0);
    console.log("cdm working here");
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dcddeaf2831547ffa5fb259c69b6236f&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    console.log(parsedData);
    this.props.setProgress(80);
    this.props.setProgress(100);
    this.setState({articles: parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false})
    }

  handlePrevClick =  async()=>{
    this.props.setProgress(0);
    console.log("Previous button is pressed");
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dcddeaf2831547ffa5fb259c69b6236f&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    console.log(parsedData); 
    this.setState({
      page:this.state.page-1,
      articles: parsedData.articles,
      loading: false
    })
    this.props.setProgress(100);
  }

   handleNextClick = async()=>{
    this.props.setProgress(0);
    console.log("Next button is pressed");
    if(!Math.ceil(this.state.page+1 > this.state.totalResults/this.props.pageSize)){
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dcddeaf2831547ffa5fb259c69b6236f&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      this.props.setProgress(50);
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData); 
      this.setState({
        page:this.state.page+1,
        articles: parsedData.articles,
        loading:false
      })
      this.props.setProgress(100);
    }

  }

  render() {
    return (
      <div>
       <div className="container my-3">
        <h1  style={{fontFamily:"cursive", fontWeight:"bold", marginTop:"80px"}}>DailyPress - Top {this.props.category} headlines</h1>
          {this.state.loading && <Spinner/>}

          <div className="row" >
            {!this.state.loading && this.state.articles.map((element)=>{
              return <div className="col-md-4 my-2" key={element.url}><NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt}/></div>
            })}
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}> Prev</button>
            <button type="button" disabled={this.state.page+1 > this.state.totalResults/this.props.pageSize} className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
          </div>
          
       </div>
      </div>
    )
  }

  
}

export default News
