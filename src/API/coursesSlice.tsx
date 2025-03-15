import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store'
import { supabase } from '../supabase';

// Define a type for the slice state
export interface CoursesState {
  courses: Array<any>,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state using that type
const initialState: CoursesState = {
  courses: [],
  status: 'idle',
  error: null
};

const getCourses = async (id: any): Promise<any> => {
  const {data, error} = await supabase
    .from('courses')
    .select()
    .eq('user_id', id);
  if (error) {
    throw new Error(error.message);
  }
  return data
};

const createCourses = async (course: any): Promise<any> => {
  const { data, error } = await supabase
    .from('courses')
    .insert(course)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data && data[0] ? data[0] : null;
};

const deleteCourses = async (id: number): Promise<any> => {
  const { data, error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id)
  if (error) {
    throw new Error(error.message);
  }
  return data && data[0] ? data[0] : null;
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (id: any) => {
    const courses = await getCourses(id);
    return courses;
  }
);

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (course: any) => {
    const newCourse = await createCourses(course);
    return newCourse;
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (id: number) => {
    const response = await deleteCourses(id);
    return {response, id};
  }
);

export const coursesSlice = createSlice({
  name: 'courses',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCourses.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch courses';
      })
      .addCase(createCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCourse.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create course';
      })
      .addCase(deleteCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCourse.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.courses = state.courses.filter(course => course.id !== action.payload.id);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete course';
      });
  }
})

export const {  } = coursesSlice.actions

export const selectCourse = (state: RootState) => state.courses.courses
export const selectCourses = (state: RootState) => state.courses.courses;
export const selectCoursesStatus = (state: RootState) => state.courses.status;
export const selectCoursesError = (state: RootState) => state.courses.error;

export default coursesSlice.reducer