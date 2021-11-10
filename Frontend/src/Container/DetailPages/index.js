import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const DetialPage = (props) => {
  
  const {
    match: {params: {id}},
    profile: {profile}
  } = props

  const [news, setNews] = useState({})

  useEffect(()=> {
    const filtered = profile.filter(val => val._id === id)
    setNews(filtered[0] || {})
  }, [profile, id])


  return (
    <>
      <div style={{backgroundColor: '#00C2F2',display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'x-large',fontWeight: 700}}>
        <p>SCRAPED NEWS {news.title}</p>
      </div>
      <div style={{backgroundColor: '#F4EC61'}}>
        {
        news.data?.map((val, index) =>
           <div key={index} style={{ fontSize: 'larger',fontWeight: 500 }}>
             {`${index + 1} ${val}`}
           </div>
           )
           }

      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default withRouter(
  connect(mapStateToProps)(DetialPage)
);
