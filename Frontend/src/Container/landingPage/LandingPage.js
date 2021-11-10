import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { MDBIcon } from "mdbreact";
import { Container } from 'react-bootstrap';

import DataTable from "react-data-table-component";
import CarouselBox from "./../../Components/Carousel"
import { updateScrap, deleteScrap } from "./../../store/actions/basicFeature"

const LandingPage = (props) => {

  const {
    profile: {profile},
    updateScrap,
    deleteScrap
  } = props

  const headers = [
    {
      name: "DATE",
      selector: "date",
      sortable: true,
      // right: true,
    },
    {
      name: "URL",
      selector: "url",
      sortable: true,
      // right: true,
    },
    {
      name: "Title",
      selector: "title",
      sortable: true,
      // right: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      conditionalCellStyles: [
        {
          when: row => row.status?.toLowerCase() === "success",
          style: {
            backgroundColor: 'rgba(63, 195, 128, 0.9)',
            color: 'white',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        },
      ]
    },
    {
      name: "View",
      button: true,
      cell: row => <>{
        row.status?.toLowerCase() === "success" ?  
        <>
        <Link to={`/read/${row._id}`} style={{color: 'black'}}>
          <MDBIcon icon="eye" size="lg" />
        </Link>
        </>
        :
        <>
        { row.halted === 0 &&  <span onClick={() => updateScrap({status:'abort', id: row._id})}><MDBIcon icon="ban" size="lg"/></span>}
        { row.status === 'abort' && <span onClick={() => deleteScrap({id: row._id})} style={{marginLeft: '5px'}}><MDBIcon icon="trash" size="lg"/></span>}
        </>
        }
        </>,
      conditionalCellStyles: [
        {
          when: row => row.status?.toLowerCase() === "success",
          style: {
            backgroundColor: 'rgba(63, 195, 128, 0.9)',
            color: 'white',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        },
      ]
    }
  ];

  return (
    <>
      <CarouselBox />
      <Container fluid>
        <DataTable
          columns={headers}
          data={profile}
          pagination={true}
          selectableRowsHighlight={true}
          highlightOnHover={true}
          pointerOnHover={true}
        />
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default withRouter(
  connect(mapStateToProps, {updateScrap, deleteScrap})(LandingPage)
);
