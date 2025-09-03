import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { School, Plus, Search } from "lucide-react";

const Index = () => {
  console.log("Index component is rendering");
  
  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <School className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            SchoolFinder
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover and compare the best schools in your area. Add schools to our comprehensive directory and help parents find the perfect educational institution for their children.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/schools">
              <Button size="lg" variant="default" className="w-full sm:w-auto">
                <Search className="h-5 w-5 mr-2" />
                Browse Schools
              </Button>
            </Link>
            <Link to="/add-school">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Plus className="h-5 w-5 mr-2" />
                Add School
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
