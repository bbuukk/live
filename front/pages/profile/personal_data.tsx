import TabLayout from "root/features/profile/comps/tab-layout";

import Data from "root/features/profile/comps/personal_data/data-section";
import Security from "root/features/profile/comps/personal_data/security-section";
import { Accordion } from "react-bootstrap";

const PersonalData = () => {
  return (
    <TabLayout>
      <div className="accordion d-flex flex-column gap-3" id="accordionExample">
        <Data />
        <Security />
      </div>
    </TabLayout>
  );
};

export default PersonalData;

export { default as getServerSideProps } from "../../utils/auth";
