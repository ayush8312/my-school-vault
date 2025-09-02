import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SchoolCard from "@/components/SchoolCard";
import Navbar from "@/components/Navbar";
import { Search, Plus, School as SchoolIcon, Loader2 } from "lucide-react";
import { useSchools } from "@/hooks/useSchools";

const ShowSchools = () => {
  const { schools, loading, error, refetch } = useSchools();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSchools, setFilteredSchools] = useState(schools);

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
                {loading ? (
                  "Loading schools..."
                ) : error ? (
                  "Error loading schools"
                ) : (
                  <>
                    {filteredSchools.length} schools found
                    {searchQuery && ` for "${searchQuery}"`}
                  </>
                )}
              </p>
            </div>
            <SchoolIcon className="h-8 w-8 text-primary" />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading schools...</span>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <SchoolIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Error loading schools
              </h3>
              <p className="text-muted-foreground mb-6">
                {error}
              </p>
              <Button onClick={refetch} variant="outline" size="lg">
                Try Again
              </Button>
            </div>
          ) : filteredSchools.length > 0 ? (
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