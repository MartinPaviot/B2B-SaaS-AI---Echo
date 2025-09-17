import { Doc } from "@workspace/backend/_generated/dataModel";
import { Hint } from "@workspace/ui/components/hint";
import { Button } from "@workspace/ui/components/button";
import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react";

export const ConversationStatusButton = ({
    status,
    onClick,
}: {
    status: Doc<"conversations">["status"];
    onClick: () => void;
}) => {
    if (status === "resolved") {
        return (
            <Hint text="Mark as unresolved">
                <Button onClick={onClick} variant="tertiary" size="sm">
                    <CheckIcon />
                    Resolved
                </Button>
            </Hint>
        );
    }

    if (status === "escalated") {
        return (
            <Hint text="Mark as resolved">
                <Button onClick={onClick} variant="warning" size="sm">
                    <ArrowUpIcon />
                    Escalated
                </Button>
            </Hint>
        );
    }

    return (
        <Hint text="Mark as escalated">
            <Button onClick={onClick} variant="destructive" size="sm">
                <ArrowRightIcon/>
                Unresolved
            </Button>
        </Hint>
    );
};
