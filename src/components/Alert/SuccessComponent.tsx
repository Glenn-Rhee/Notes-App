import { FeedbackProps } from "@/types/main";
import { Alert, AlertIcon } from "@chakra-ui/react";

export default function SuccessComponent(props: FeedbackProps) {
  const { message } = props;
  return (
    <Alert status="success">
      <AlertIcon />
      {message}
    </Alert>
  );
}
