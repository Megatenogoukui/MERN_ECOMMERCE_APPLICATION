import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import React from "react";

// A reusable Pagination component that generates pagination links
// based on the number of pages and current page.
function Paginate({ pages, page, isAdmin = false, keyword = "" }) {
  return (
    // Only render pagination if there are more than 1 page
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => {
          return (
            // Create a LinkContainer for each page number
            <LinkContainer
              key={x + 1}
              to={
                isAdmin
                  ? `/admin/productList/${x + 1}` // For admin product list
                  : keyword
                  ? `/search/${keyword}/page/${x + 1}` // For search results
                  : `/page/${x + 1}` // For regular pagination
              }
            >
              <Pagination.Item active={x + 1 === page}>
                {" "}
                {x + 1}
              </Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
    )
  );
}

export default Paginate;