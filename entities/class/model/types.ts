export interface GymClass {
  id: string;
  name: string;
  day_of_week: number; // 0-6
  start_time: string;  // "19:00"
  end_time: string;    // "20:00"
  capacity: number;
  is_active: boolean;
}

export interface Attendance {
  id: string;
  class_id: string;
  student_id: string;
  attendance_date: string;
  status: 'present' | 'absent';
  payment_status_snapshot: string; 
}