import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useSchools, type SchoolInsert } from "@/hooks/useSchools";

interface SchoolFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: FileList;
}

const AddSchool = () => {
  const navigate = useNavigate();
  const { addSchool, uploadSchoolImage } = useSchools();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SchoolFormData>();

  const imageFile = watch("image");

  // Handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: SchoolFormData) => {
    setIsSubmitting(true);
    
    try {
      let imageUrl = "";
      
      // Upload image if provided
      if (data.image && data.image[0]) {
        const uploadedUrl = await uploadSchoolImage(data.image[0]);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      
      // Prepare school data
      const schoolData: SchoolInsert = {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        contact: data.contact,
        email_id: data.email_id,
        image: imageUrl || null
      };
      
      // Add school to database
      await addSchool(schoolData);
      navigate("/");
      
    } catch (error) {
      console.error('Error adding school:', error);
      // Error toast is handled in the hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-primary-foreground hover:bg-white/20 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Schools
            </Button>
            
            <Card className="bg-white/95 backdrop-blur-sm shadow-elegant">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-primary">
                  Add New School
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill in the details to add a new school to our directory
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">School Name *</Label>
                      <Input
                        id="name"
                        {...register("name", { 
                          required: "School name is required",
                          minLength: { value: 2, message: "Name must be at least 2 characters" }
                        })}
                        placeholder="Enter school name"
                      />
                      {errors.name && (
                        <p className="text-destructive text-sm">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number *</Label>
                      <Input
                        id="contact"
                        type="tel"
                        {...register("contact", { 
                          required: "Contact number is required",
                          pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit phone number" }
                        })}
                        placeholder="Enter contact number"
                      />
                      {errors.contact && (
                        <p className="text-destructive text-sm">{errors.contact.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      {...register("address", { 
                        required: "Address is required",
                        minLength: { value: 10, message: "Address must be at least 10 characters" }
                      })}
                      placeholder="Enter complete address"
                      rows={3}
                    />
                    {errors.address && (
                      <p className="text-destructive text-sm">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        {...register("city", { 
                          required: "City is required",
                          minLength: { value: 2, message: "City must be at least 2 characters" }
                        })}
                        placeholder="Enter city"
                      />
                      {errors.city && (
                        <p className="text-destructive text-sm">{errors.city.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        {...register("state", { 
                          required: "State is required",
                          minLength: { value: 2, message: "State must be at least 2 characters" }
                        })}
                        placeholder="Enter state"
                      />
                      {errors.state && (
                        <p className="text-destructive text-sm">{errors.state.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email_id">Email ID *</Label>
                    <Input
                      id="email_id"
                      type="email"
                      {...register("email_id", { 
                        required: "Email is required",
                        pattern: { 
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                          message: "Enter a valid email address" 
                        }
                      })}
                      placeholder="Enter email address"
                    />
                    {errors.email_id && (
                      <p className="text-destructive text-sm">{errors.email_id.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">School Image</Label>
                    <div className="flex flex-col space-y-4">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        onChange={handleImageChange}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                      {imagePreview && (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="School preview"
                            className="w-full h-48 object-cover rounded-lg shadow-card"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-accent hover:opacity-90 text-white shadow-elegant"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Adding School...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Add School
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchool;