import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: string;
}

interface SchoolCardProps {
  school: School;
}

const SchoolCard = ({ school }: SchoolCardProps) => {
  return (
    <Card className="group overflow-hidden bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-video overflow-hidden">
        <img
          src={school.image}
          alt={school.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {school.name}
        </h3>
        
        <div className="space-y-2 text-muted-foreground">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
            <div>
              <p className="text-sm">{school.address}</p>
              <p className="text-sm font-medium">{school.city}, {school.state}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-primary" />
            <p className="text-sm">{school.contact}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-primary" />
            <p className="text-sm">{school.email_id}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolCard;