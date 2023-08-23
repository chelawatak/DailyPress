import React, { Component } from 'react'

export class NewsItem extends Component {
  

  render() {
    let {title,description, imageUrl, newsUrl, author}=this.props
    return (
      <div className="my-3">
        <div className="card">
        <img src={!imageUrl?"https://images.hindustantimes.com/img/2022/05/15/550x309/WhatsApp_Image_2021-09-18_at_09.42.18_1631944439782_1652573424777.jpeg":imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={newsUrl} target = "_target" className="btn btn-sm" style={{backgroundColor:"rgb(153, 0, 77)",color:"white"}}>Read More</a>
          <p className="card-text"><small>last updated by {!author?"Unknown":author} on {new Date().toGMTString()}</small></p>
        </div>
      </div>
      </div>
    )
  }
}

export default NewsItem
