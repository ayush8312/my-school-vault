import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SchoolCard from "@/components/SchoolCard";
import Navbar from "@/components/Navbar";
import { Search, Plus, School as SchoolIcon } from "lucide-react";

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

// Mock data for demonstration
const mockSchools: School[] = [
  {
    id: 1,
    name: "Delhi Public School",
    address: "Mathura Road, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    contact: "9876543210",
    email_id: "info@dpsdelhi.com",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Modern School",
    address: "Barakhamba Road, Connaught Place",
    city: "New Delhi",
    state: "Delhi",
    contact: "9876543211",
    email_id: "contact@modernschool.net",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=500&h=300&fit=crop"
  },
  {
    id: 3,
    name: "St. Xavier's School",
    address: "Raj Nagar, Ghaziabad",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    contact: "9876543212",
    email_id: "admin@stxaviers.edu.in",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Ryan International School",
    address: "Sector 25, Rohini",
    city: "New Delhi",
    state: "Delhi",
    contact: "9876543213",
    email_id: "info@ryaninternational.org",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=300&fit=crop"
  }
];

const ShowSchools = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Load schools from localStorage and merge with mock data
    const savedSchools = JSON.parse(localStorage.getItem('schools') || '[]');
    const allSchools = [...mockSchools, ...savedSchools];
    setSchools(allSchools);
    setFilteredSchools(allSchools);
  }, []);

  useEffect(() => {
    // Filter schools based on search query
    const filtered = schools.filter(school =>
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.state.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSchools(filtered);
  }, [searchQuery, schools]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Find the Best School for Your Child
          </h1>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Discover top-rated schools in your area with our comprehensive directory
          </p>
          
          <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by school name, city, or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 text-lg bg-white/95 backdrop-blur-sm"
              />
            </div>
            <Link to="/add-school">
              <Button size="lg" variant="secondary" className="w-full md:w-auto bg-gradient-accent hover:opacity-90">
                <Plus className="h-5 w-5 mr-2" />
                Add School
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Schools Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                School Directory
              </h2>
              <p className="text-muted-foreground">
                {filteredSchools.length} schools found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
            <SchoolIcon className="h-8 w-8 text-primary" />
          </div>

          {filteredSchools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <SchoolIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No schools found
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? `No schools match your search for "${searchQuery}"`
                  : "No schools have been added yet"
                }
              </p>
              <Link to="/add-school">
                <Button variant="outline" size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Add the First School
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ShowSchools;