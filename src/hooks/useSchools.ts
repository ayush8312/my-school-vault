import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from 'sonner';

export interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: string | null;
  created_at?: string;
}

export interface SchoolInsert {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image?: string;
}

export const useSchools = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for demonstration when Supabase isn't connected
  const mockSchools: School[] = [
    {
      id: 1,
      name: "Delhi Public School",
      address: "Mathura Road, New Delhi",
      city: "New Delhi",
      state: "Delhi",
      contact: "9876543210",
      email_id: "info@dpsdelhi.com",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
      created_at: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      name: "St. Xavier's High School",
      address: "Park Street, Kolkata",
      city: "Kolkata", 
      state: "West Bengal",
      contact: "9876543211",
      email_id: "contact@stxaviers.edu",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
      created_at: "2024-01-14T09:15:00Z"
    },
    {
      id: 3,
      name: "Modern Academy",
      address: "MG Road, Bangalore",
      city: "Bangalore",
      state: "Karnataka", 
      contact: "9876543212",
      email_id: "info@modernacademy.in",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
      created_at: "2024-01-13T14:45:00Z"
    },
    {
      id: 4,
      name: "Ryan International School",
      address: "Sector 25, Noida", 
      city: "Noida",
      state: "Uttar Pradesh",
      contact: "9876543213",
      email_id: "admin@ryangroup.org",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop",
      created_at: "2024-01-12T11:20:00Z"
    },
    {
      id: 5,
      name: "Cambridge International School",
      address: "Banjara Hills, Hyderabad",
      city: "Hyderabad",
      state: "Telangana",
      contact: "9876543214", 
      email_id: "info@cambridge-hyd.com",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      created_at: "2024-01-11T16:30:00Z"
    },
    {
      id: 6,
      name: "Vidya Bhawan Public School",
      address: "Civil Lines, Jaipur",
      city: "Jaipur",
      state: "Rajasthan",
      contact: "9876543215",
      email_id: "contact@vidyabhawan.org", 
      image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400&h=300&fit=crop",
      created_at: "2024-01-10T08:45:00Z"
    }
  ];

  const fetchSchools = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!isSupabaseConfigured || !supabase) {
        // Use mock data when Supabase isn't configured
        setTimeout(() => {
          setSchools(mockSchools);
          setLoading(false);
        }, 500); // Simulate loading delay
        return;
      }
      
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setSchools(data || []);
    } catch (err: any) {
      console.error('Error fetching schools:', err);
      setError(err.message);
      toast.error('Failed to load schools');
    } finally {
      if (isSupabaseConfigured && supabase) {
        setLoading(false);
      }
    }
  };

  const addSchool = async (schoolData: SchoolInsert): Promise<School | null> => {
    try {
      if (!isSupabaseConfigured || !supabase) {
        toast.error('Supabase is not configured. Please connect to Supabase to add schools.');
        throw new Error('Supabase not configured');
      }
      
      const { data, error } = await supabase
        .from('schools')
        .insert([schoolData])
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setSchools(prev => [data, ...prev]);
        toast.success('School added successfully!');
        return data;
      }
      
      return null;
    } catch (err: any) {
      console.error('Error adding school:', err);
      toast.error('Failed to add school');
      throw err;
    }
  };

  const uploadSchoolImage = async (file: File): Promise<string | null> => {
    try {
      if (!isSupabaseConfigured || !supabase) {
        toast.error('Supabase is not configured. Please connect to Supabase to upload images.');
        return null;
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `school-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('schools')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('schools')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err: any) {
      console.error('Error uploading image:', err);
      toast.error('Failed to upload image');
      return null;
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return {
    schools,
    loading,
    error,
    addSchool,
    uploadSchoolImage,
    refetch: fetchSchools
  };
};