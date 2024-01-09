import { FeedbackProps } from "@/types/main";
import { Alert, AlertIcon } from "@chakra-ui/react";

export default function ErrorComponent(props: FeedbackProps) {
  const { message } = props;
  return (
    <Alert status="error">
      <AlertIcon />
      {message}
    </Alert>
  );
}
