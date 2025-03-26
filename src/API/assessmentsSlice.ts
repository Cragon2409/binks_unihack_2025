import { 
  createSlice, 
  createAsyncThunk, 
  PayloadAction 
} from '@reduxjs/toolkit';
import { supabase } from './supabase';

import { Assessment } from '../common/Types';

// Define a type for the slice state
export interface AssessmentsState {
  assessments: Array<Assessment>,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state using that type
const initialState: AssessmentsState = {
  assessments: [],
  status: 'idle',
  error: null
};

const getAssessments = async (id: any): Promise<any> => {
    const {data, error} = await supabase
      .from('assessments')
      .select()
      .eq('user_id', id);
    if (error) {
      throw new Error(error.message);
    }
    return data
  };
  
const createAssessments = async (assessment: any): Promise<any> => {
    const { data, error } = await supabase
        .from('assessments')
        .insert(assessment)
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data && data[0] ? data[0] : null;
};

const updateAssessments = async (id: number, assessment: any): Promise<any> => {
    const { data, error } = await supabase
        .from('assessments')
        .update(assessment)
        .eq('id', id)
        .select()
    if (error) {
        throw new Error(error.message);
    }
    return data && data[0] ? data[0] : null;
};
  
const deleteAssessments = async (id: number): Promise<any> => {
    const { data, error } = await supabase
        .from('assessments')
        .delete()
        .eq('id', id)
    if (error) {
        throw new Error(error.message);
    }
    return data && data[0] ? data[0] : null;
};

export const fetchAssessments = createAsyncThunk(
  'assessments/fetchAssessments',
  async (id: any) => {
    const courses = await getAssessments(id);
    return courses;
  }
);

export const createAssessment = createAsyncThunk(
  'assessments/createAssessment',
  async (course: any) => {
    const newCourse = await createAssessments(course);
    return newCourse;
  }
);

export const updateAssessment = createAsyncThunk(
    'assessments/updateAssessment',
    async ({ id, assessment }: { id: number, assessment: any }) => {
      const newAssessment = await updateAssessments(id, assessment);
      return newAssessment;
    }
  );

export const deleteAssessment = createAsyncThunk(
  'assessments/deleteAssessment',
  async (id: number) => {
    const response = await deleteAssessments(id);
    return {response, id};
  }
);

export const assessmentsSlice = createSlice({
  name: 'assessments',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAssessments.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAssessments.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.assessments = action.payload;
      })
      .addCase(fetchAssessments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch courses';
      })
      .addCase(createAssessment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAssessment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.assessments.push(action.payload);
      })
      .addCase(createAssessment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create course';
      })
      .addCase(updateAssessment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAssessment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.assessments = state.assessments.map((assessment) =>
          assessment.id === action.payload.id ? action.payload : assessment
        );
      })
      .addCase(updateAssessment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create course';
      })
      .addCase(deleteAssessment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAssessment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.assessments = state.assessments.filter(assessment => assessment.id !== action.payload.id);
      })
      .addCase(deleteAssessment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete course';
      });
  }
})

export default assessmentsSlice.reducer