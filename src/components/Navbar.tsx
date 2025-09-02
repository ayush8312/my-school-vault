import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Search, Plus } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-hero shadow-elegant">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
            <span className="text-xl font-bold text-primary-foreground">
              SchoolFinder
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? "secondary" : "ghost"}
                size="sm"
                className="text-primary-foreground hover:bg-white/20"
              >
                <Search className="h-4 w-4 mr-2" />
                Find Schools
              </Button>
            </Link>
            
            <Link to="/add-school">
              <Button 
                variant={location.pathname === '/add-school' ? "secondary" : "ghost"}
                size="sm"
                className="text-primary-foreground hover:bg-white/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add School
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;