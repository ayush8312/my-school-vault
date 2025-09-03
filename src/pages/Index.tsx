import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { School, Plus, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <School className="h-20 w-20 text-white mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            SchoolFinder
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover and compare the best schools in your area. Add schools to our comprehensive directory and help parents find the perfect educational institution for their children.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/schools">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
                <Search className="h-5 w-5 mr-2" />
                Browse Schools
              </Button>
            </Link>
            <Link to="/add-school">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
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
