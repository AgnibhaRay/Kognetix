import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { FileWarningIcon } from "lucide-react";
import Link from "next/link";

const SettingsPage = () => {

    return (
        <div>
            <Heading 
            title="Free Testing!!!!!!"
            description="Under Construction, till Pro version is rolled"
            icon={FileWarningIcon}
            iconColor="text-black"
            bgColor="bg-black/10"
            />
            <div className="px-4 lg:px-8">
            <Link href="/dashboard">
                <Button variant="outline">
                    Back to Dashboard
                </Button>
            </Link>
            </div>
            
        </div>
    )
}

export default SettingsPage;