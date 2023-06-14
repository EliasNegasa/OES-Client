import React from "react";
import { StyledDashboardCard, StyledFlex } from "../ui/styledDashBoard";

const DashboardBox = ({ label, value, icon, ...rest }) => {
  return (
    <StyledDashboardCard {...rest}>
      <div className="card-block">
        <StyledFlex>
          <div>
            <p>{label}</p>
            <h4>{value}</h4>
          </div>
          <div>{icon}</div>
        </StyledFlex>
      </div>
    </StyledDashboardCard>
  );
};

export default DashboardBox;
