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

  const fetchSchools = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!isSupabaseConfigured || !supabase) {
        setError('Supabase is not configured. Please connect to Supabase to use database features.');
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
      setLoading(false);
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