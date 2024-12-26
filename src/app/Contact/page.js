import TempContact from "@/components/contact";
import InfoContact from "@/components/infocontact";
import CallContact from "@/components/callcontact";
import ImgContact from "@/components/imgcontact";

export const metadata = {
  title: "تماس با ما",
};

const Contact = () => {
  return (
    <TempContact>
      <ImgContact />
      <InfoContact />
      <CallContact />
    </TempContact>
  );
};

export default Contact;
