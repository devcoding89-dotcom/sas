export interface Course {
  id: string;
  code: string;
  title: string;
  semester: string;
  units: number;
  docCount: number;
  color: string;
}

export interface DocumentItem {
  id: string;
  courseId: string;
  courseCode: string;
  fileName: string;
  fileSizeBytes: number;
  pageCount: number;
  status: 'uploaded' | 'queued' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  sharedBy?: string;
  downloads?: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  sourcePage?: number;
  mastered?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  sourcePage?: number;
}

export interface StudySession {
  id: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  scheduledAt: string;
  durationMinutes: number;
  status: 'scheduled' | 'completed' | 'missed';
}

export interface SharedDoc {
  title: string;
  department: string;
  size: string;
  date: string;
}

export interface StudentPeer {
  id: string;
  name: string;
  handle: string;
  university: string;
  faculty: string;
  department: string;
  level: string;
  avatarInitials: string;
  avatarUrl?: string;
  coverUrl?: string;
  streakDays: number;
  studyPoints: number;
  bio: string;
  followingCount: number;
  followersCount: number;
  courses: string[];
  connectionStatus: 'connected' | 'pending' | 'none';
  online: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  sharedDocs?: SharedDoc[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  attachmentPdf?: string;
  attachmentSize?: string;
}

export const CURRENT_STUDENT = {
  id: "student-me",
  name: "Chinedu Okafor",
  university: "University of Lagos (UNILAG)",
  level: "300 Level",
  department: "Computer Science",
  faculty: "Faculty of Science",
  semester: "1st Semester 2026/2027",
  streakDays: 4,
  studyPoints: 1420,
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
};

export const MOCK_COURSES: Course[] = [
  { id: "c1", code: "CSC201", title: "Data Structures & Algorithms", semester: "1st Semester", units: 3, docCount: 4, color: "#16A34A" },
  { id: "c2", code: "MTH201", title: "Mathematical Methods I (ODEs)", semester: "1st Semester", units: 3, docCount: 2, color: "#2563EB" },
  { id: "c3", code: "GST211", title: "Philosophy, Logic & Human Existence", semester: "1st Semester", units: 2, docCount: 3, color: "#D97706" },
  { id: "c4", code: "PHY202", title: "Electric Circuits & Electronics", semester: "1st Semester", units: 3, docCount: 1, color: "#059669" },
];

export const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: "doc-1",
    courseId: "c1",
    courseCode: "CSC201",
    fileName: "Lecture_04_Binary_Search_Trees.pdf",
    fileSizeBytes: 2450000,
    pageCount: 28,
    status: "completed",
    createdAt: "2 hours ago",
    sharedBy: "Self",
    downloads: 14,
  },
  {
    id: "doc-2",
    courseId: "c3",
    courseCode: "GST211",
    fileName: "GST211_Informal_Fallacies_Handout.pdf",
    fileSizeBytes: 1800000,
    pageCount: 19,
    status: "completed",
    createdAt: "Yesterday",
    sharedBy: "Self",
    downloads: 32,
  },
  {
    id: "doc-3",
    courseId: "c2",
    courseCode: "MTH201",
    fileName: "First_Order_Differential_Eqns.pdf",
    fileSizeBytes: 3200000,
    pageCount: 34,
    status: "processing",
    createdAt: "Just now",
  },
];

export const MOCK_SHARED_LIBRARY: DocumentItem[] = [
  {
    id: "sh-1",
    courseId: "c1",
    courseCode: "CSC201",
    fileName: "UNILAG_CSC201_2018_2024_PastQuestions_Solved.pdf",
    fileSizeBytes: 4200000,
    pageCount: 42,
    status: "completed",
    createdAt: "3 days ago",
    sharedBy: "Blessing Okafor (UNILAG)",
    downloads: 184,
  },
  {
    id: "sh-2",
    courseId: "c2",
    courseCode: "MTH201",
    fileName: "OAU_MTH201_ODE_Quick_Formula_Sheet.pdf",
    fileSizeBytes: 1200000,
    pageCount: 12,
    status: "completed",
    createdAt: "5 days ago",
    sharedBy: "Amina Yusuf (OAU)",
    downloads: 97,
  },
  {
    id: "sh-3",
    courseId: "c3",
    courseCode: "GST211",
    fileName: "GST211_All_Lecturers_Summarized_Review.pdf",
    fileSizeBytes: 2100000,
    pageCount: 24,
    status: "completed",
    createdAt: "1 week ago",
    sharedBy: "Folake Adeleke (UI)",
    downloads: 245,
  },
  {
    id: "sh-4",
    courseId: "c4",
    courseCode: "PHY202",
    fileName: "Kirchhoff_Laws_AC_Circuits_Worked_Examples.pdf",
    fileSizeBytes: 3500000,
    pageCount: 31,
    status: "completed",
    createdAt: "2 weeks ago",
    sharedBy: "Ibrahim Sani (ABU Zaria)",
    downloads: 73,
  },
];

export const MOCK_STUDENTS: StudentPeer[] = [
  {
    id: "peer-blessing",
    name: "Blessing Okafor",
    handle: "@blessingokafor",
    university: "University of Lagos (UNILAG)",
    faculty: "Faculty of Science",
    department: "Computer Science",
    level: "300 Level",
    avatarInitials: "BO",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    coverUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80",
    streakDays: 14,
    studyPoints: 2450,
    followingCount: 245,
    followersCount: 189,
    bio: "Learning, growing, and building a better future!",
    courses: ["CSC201", "CSC301", "MTH201"],
    connectionStatus: "connected",
    online: true,
    lastMessage: "Hey, can you send me the notes for Data Structures?",
    lastMessageTime: "10:24 AM",
    unreadCount: 1,
    sharedDocs: [
      {
        title: "Data Structures Notes",
        department: "Computer Science",
        size: "1.4 MB",
        date: "2 Apr 2025"
      },
      {
        title: "Network Security Summary",
        department: "Computer Science",
        size: "800 KB",
        date: "3 Apr 2025"
      },
      {
        title: "Web Development Guide",
        department: "Computer Science",
        size: "5.2 MB",
        date: "5 Apr 2025"
      }
    ]
  },
  {
    id: "peer-tunde",
    name: "Tunde Adebayo",
    handle: "@tundebayo",
    university: "University of Lagos (UNILAG)",
    faculty: "Faculty of Science",
    department: "Computer Science",
    level: "300 Level",
    avatarInitials: "TA",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    coverUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80",
    streakDays: 7,
    studyPoints: 1620,
    followingCount: 140,
    followersCount: 95,
    bio: "Focused on database systems and software engineering.",
    courses: ["CSC301", "CSC305"],
    connectionStatus: "connected",
    online: true,
    lastMessage: "See you in class later!",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    sharedDocs: [
      {
        title: "Database Normalization Handout",
        department: "Computer Science",
        size: "2.1 MB",
        date: "10 Apr 2025"
      }
    ]
  },
  {
    id: "peer-sarah",
    name: "Sarah Johnson",
    handle: "@sarahj",
    university: "University of Ibadan (UI)",
    faculty: "Faculty of Science",
    department: "Computer Science",
    level: "300 Level",
    avatarInitials: "SJ",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80",
    coverUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80",
    streakDays: 21,
    studyPoints: 3820,
    followingCount: 310,
    followersCount: 290,
    bio: "Algorithms tutor & departmental study coordinator.",
    courses: ["CSC201", "GST211"],
    connectionStatus: "connected",
    online: false,
    lastMessage: "The handout is mentioned in chapter 4...",
    lastMessageTime: "2 days ago",
    unreadCount: 0,
    sharedDocs: [
      {
        title: "UI CSC201 Past Questions Solutions",
        department: "Computer Science",
        size: "3.8 MB",
        date: "14 Mar 2025"
      }
    ]
  },
  {
    id: "peer-emeka",
    name: "Emeka Nwosu",
    handle: "@emekanwosu",
    university: "University of Nigeria Nsukka (UNN)",
    faculty: "Engineering",
    department: "Electronic Engineering",
    level: "300 Level",
    avatarInitials: "EN",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
    coverUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80",
    streakDays: 9,
    studyPoints: 1980,
    followingCount: 175,
    followersCount: 160,
    bio: "Embedded systems, circuit logic and ODE math.",
    courses: ["PHY202", "MTH201"],
    connectionStatus: "connected",
    online: false,
    lastMessage: "Thanks bro!",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
  },
  {
    id: "peer-chiamaka",
    name: "Chiamaka Eze",
    handle: "@chiamaka_e",
    university: "Obafemi Awolowo University (OAU)",
    faculty: "Technology",
    department: "Computer Engineering",
    level: "200 Level",
    avatarInitials: "CE",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    coverUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80",
    streakDays: 16,
    studyPoints: 2950,
    followingCount: 220,
    followersCount: 215,
    bio: "Lover of code, discrete math, and robotics.",
    courses: ["CSC201", "MTH201"],
    connectionStatus: "connected",
    online: true,
    lastMessage: "Let's review Chapter 3 tonight",
    lastMessageTime: "Monday",
    unreadCount: 0,
  },
  {
    id: "peer-david",
    name: "David Kalu",
    handle: "@davidkalu",
    university: "Ahmadu Bello University (ABU Zaria)",
    faculty: "Physical Sciences",
    department: "Computer Science",
    level: "200 Level",
    avatarInitials: "DK",
    avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80",
    coverUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80",
    streakDays: 4,
    studyPoints: 850,
    followingCount: 90,
    followersCount: 80,
    bio: "Prepping for GST logic exams.",
    courses: ["GST211"],
    connectionStatus: "connected",
    online: false,
    lastMessage: "Algorithms together?",
    lastMessageTime: "Sunday",
    unreadCount: 0,
  },
];

export const MOCK_CHATS: Record<string, ChatMessage[]> = {
  "peer-blessing": [
    {
      id: "bm-1",
      senderId: "peer-blessing",
      senderName: "Blessing Okafor",
      text: "Hey, can you send me the notes for Data Structures?",
      timestamp: "10:24 AM",
    },
    {
      id: "bm-2",
      senderId: "student-me",
      senderName: "Chinedu",
      text: "Sure! I'll share it now.",
      timestamp: "10:25 AM",
    },
    {
      id: "bm-3",
      senderId: "student-me",
      senderName: "Chinedu",
      text: "Here are the complete Binary Search Trees & AVL Rotations slides with AI annotations.",
      timestamp: "10:25 AM",
      attachmentPdf: "Data Structures Notes.pdf",
      attachmentSize: "2.4 MB",
    },
  ],
  "peer-tunde": [
    {
      id: "tm-1",
      senderId: "peer-tunde",
      senderName: "Tunde",
      text: "See you in class later!",
      timestamp: "Yesterday",
    },
  ],
  "peer-sarah": [
    {
      id: "sm-1",
      senderId: "peer-sarah",
      senderName: "Sarah",
      text: "The handout is mentioned in chapter 4. Take a look when free.",
      timestamp: "2 days ago",
    },
  ],
  "peer-emeka": [
    {
      id: "em-1",
      senderId: "peer-emeka",
      senderName: "Emeka",
      text: "Thanks bro! The quiz questions were super helpful.",
      timestamp: "Yesterday",
    },
  ],
  "peer-chiamaka": [
    {
      id: "cm-1",
      senderId: "peer-chiamaka",
      senderName: "Chiamaka",
      text: "Let's review Chapter 3 tonight on Google Meet or StudyMate chat.",
      timestamp: "Monday",
    },
  ],
  "peer-david": [
    {
      id: "dm-1",
      senderId: "peer-david",
      senderName: "David",
      text: "Algorithms together this weekend?",
      timestamp: "Sunday",
    },
  ],
};

export const MOCK_FLASHCARDS: Flashcard[] = [
  {
    id: "fc-1",
    front: "What is the primary condition that defines a Binary Search Tree (BST)?",
    back: "For every node X, all values in its left subtree are strictly less than X, and all values in its right subtree are strictly greater than X.",
    sourcePage: 4,
    mastered: false,
  },
  {
    id: "fc-2",
    front: "What is the worst-case time complexity of searching in an unbalanced BST?",
    back: "O(n) — this occurs when keys are inserted in sequential sorted order, causing the tree to degenerate into a linear linked list.",
    sourcePage: 9,
    mastered: true,
  },
  {
    id: "fc-3",
    front: "Which tree traversal outputs the keys of a BST in strictly ascending sorted order?",
    back: "In-order traversal (Left, Root, Right).",
    sourcePage: 14,
    mastered: false,
  },
  {
    id: "fc-4",
    front: "What self-balancing BST mechanism guarantees O(log n) worst-case height?",
    back: "AVL Trees (via balance factor checks and rotations: LL, RR, LR, RL) or Red-Black Trees.",
    sourcePage: 21,
    mastered: false,
  },
  {
    id: "fc-5",
    front: "When deleting a node with two children from a BST, what node can replace it?",
    back: "Either its in-order predecessor (maximum node in the left subtree) or in-order successor (minimum node in the right subtree).",
    sourcePage: 18,
    mastered: true,
  },
];

export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q-1",
    question: "What is the time complexity of binary search?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)",
    ],
    correctIndex: 1,
    explanation: "In a balanced tree or sorted array, binary search cuts the search space in half each iteration, achieving O(log n).",
    sourcePage: 6,
  },
  {
    id: "q-2",
    question: "If elements [15, 10, 20, 8, 12, 18, 25] are inserted sequentially into an empty BST, which element is the root of the left subtree?",
    options: [
      "8",
      "10",
      "12",
      "20",
    ],
    correctIndex: 1,
    explanation: "15 is the root. 10 is less than 15, so it goes to the left of 15 and becomes the root of the left subtree.",
    sourcePage: 8,
  },
  {
    id: "q-3",
    question: "Why does performing an In-Order Traversal on a valid BST always visit keys in ascending sorted order?",
    options: [
      "Because it visits the root node before the subtrees.",
      "Because all left descendants (< root) are visited before the root, which is visited before all right descendants (> root).",
      "Because it sorts the elements in a separate temporary array during recursion.",
      "Because leaf nodes are always processed first.",
    ],
    correctIndex: 1,
    explanation: "In-order traversal strictly executes Left -> Root -> Right. By definition of BST, Left < Root < Right, inherently yielding sorted order.",
    sourcePage: 15,
  },
  {
    id: "q-4",
    question: "An AVL Tree maintains balance by ensuring that for every node, the height difference between left and right subtrees is at most:",
    options: [
      "0",
      "1",
      "2",
      "log(n)",
    ],
    correctIndex: 1,
    explanation: "The AVL balance factor is defined as Balance = Height(Left) - Height(Right). A node is balanced if Balance is in {-1, 0, 1}.",
    sourcePage: 22,
  },
];

export const MOCK_SUMMARY = {
  documentTitle: "Lecture 04: Binary Search Trees & Tree Rotations",
  courseCode: "CSC201",
  totalSections: 4,
  estimatedReadTime: "6 min read",
  executiveSummary: "This document covers non-linear hierarchical data structures focusing on Binary Search Trees (BST), operation complexities, traversals, node deletions, and self-balancing mechanisms like AVL rotations. For Nigerian semester examinations, focus on in-order traversals and deletion edge cases.",
  sections: [
    {
      title: "1. Core Characteristics of a BST",
      bullets: [
        "Binary tree property: each node has at most two children (left and right).",
        "Key ordering constraint: Left subtree < Parent < Right subtree.",
        "Duplicates: In standard implementations, duplicates are either disallowed or grouped in a frequency counter.",
      ],
    },
    {
      title: "2. Complexity Analysis & Degeneration",
      bullets: [
        "Average Case: O(log n) for Search, Insert, Delete.",
        "Worst Case: O(n) when keys are inserted in strictly sorted or reverse-sorted order (skewed tree).",
        "Exam Tip: Lecturers frequently ask how an unbalanced BST can degrade to a singly-linked list.",
      ],
    },
    {
      title: "3. Node Deletion Procedure (3 Cases)",
      bullets: [
        "Case 1 (Leaf Node): Simply remove the node and update parent pointer to null.",
        "Case 2 (One Child): Bypass the node by linking its parent directly to its child.",
        "Case 3 (Two Children): Find the In-Order Successor (smallest node in right subtree) or Predecessor, copy its value to the target, and delete that successor.",
      ],
    },
  ],
  keyFormulas: [
    { term: "Max Nodes at Level i", definition: "2^i (where root is level 0)" },
    { term: "Max Nodes in Tree of Height h", definition: "2^(h+1) - 1" },
    { term: "AVL Balance Factor", definition: "BF = Height(Left Subtree) - Height(Right Subtree) ∈ {-1, 0, 1}" },
  ],
};

export const MOCK_STUDY_SESSIONS: StudySession[] = [
  {
    id: "s-1",
    courseCode: "CSC201",
    courseTitle: "Data Structures",
    title: "Review BST Rotations & 10 Flashcards",
    scheduledAt: "Today, 4:00 PM",
    durationMinutes: 45,
    status: "scheduled",
  },
  {
    id: "s-2",
    courseCode: "MTH201",
    courseTitle: "Mathematical Methods",
    title: "ODE Integrating Factors & Practice Quiz",
    scheduledAt: "Tomorrow, 10:00 AM",
    durationMinutes: 60,
    status: "scheduled",
  },
  {
    id: "s-3",
    courseCode: "GST211",
    courseTitle: "Philosophy & Logic",
    title: "Ad Hominem vs Strawman Fallacy Deck",
    scheduledAt: "Yesterday",
    durationMinutes: 30,
    status: "completed",
  },
];
