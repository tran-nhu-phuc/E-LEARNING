import { RegisteredCourseService } from "../../services/registeredCourses.service";
import { PayPalButtons } from "@paypal/react-paypal-js";
import toast, { Toaster } from "react-hot-toast";


interface Props {
  amount: number;
  data: any;
}

const PaypalComponent = (props: Props) => {
  const { amount } = props
  const user = JSON.parse(localStorage.getItem("user") as string);
  const registeredCourse = new RegisteredCourseService();
  const handlePaymentSuccess = async () => {
    
    const form = {
      courseId: props.data?.id,
      userId: user.id,
      totalLessons: props.data?.lessons.length,
      price: props.amount * 24000,
    }
    await registeredCourse.create(form);
    toast.success("Đăng ký thành công khóa học!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  return (
    <PayPalButtons
      style={{
        layout: "horizontal",
        height: 48,
        color: "blue",
      }}
      createOrder={(_data: any, actions: any) => {
        try {
          return actions.order?.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: String(amount ? amount : 1),
                },
                description: `Purchase at ${new Date().toLocaleString()}`,
              },
            ],
          });
        } catch (error) {
        }
      }}
      onApprove={(_: any, actions: any) => {
        return actions.order?.capture().then(() => handlePaymentSuccess());
      }}
    />
  );
};

export default PaypalComponent;
