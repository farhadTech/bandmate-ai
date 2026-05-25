"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Filter,
  GraduationCap,
  Headphones,
  Mic,
  PenLine,
  Search,
  Sparkles,
} from "lucide-react";
import CambridgeBookCard, {
  CambridgeBook,
  CambridgeTest,
} from "@/components/mock-test/CambridgeBookCard";
import TestModeModal, {
  SelectedModule,
  TestMode,
} from "@/components/mock-test/TestModeModal";
import Button from "@/components/ui/Button";

function createCambridgeBooks (): CambridgeBook[] {
  const bookNumbers = Array.from( { length: 16 }, ( _, index ) => 20 - index );

  return bookNumbers.map( ( number ) => {
    return {
      id: `cambridge-${ number }`,
      title: `Cambridge ${ number }`,
      label: `C${ number }`,
      tests: [
        {
          id: "test-1",
          title: "Test 1",
          status:
            number === 20 || number === 18 || number === 15
              ? "not-started"
              : "completed",
        },
        {
          id: "test-2",
          title: "Test 2",
          status:
            number === 19 || number === 16 || number === 12
              ? "in-progress"
              : "not-started",
        },
        {
          id: "test-3",
          title: "Test 3",
          status:
            number === 17 || number === 14 || number === 10
              ? "completed"
              : "not-started",
        },
        {
          id: "test-4",
          title: "Test 4",
          status:
            number === 13 || number === 11 || number === 8
              ? "completed"
              : "not-started",
        },
      ] as CambridgeTest[],
    };
  } );
}

const books: CambridgeBook[] = createCambridgeBooks();

export default function MockTestLibraryPage () {
  const [ searchQuery, setSearchQuery ] = useState( "" );
  const [ bookFilter, setBookFilter ] = useState( "All Books" );
  const [ statusFilter, setStatusFilter ] = useState( "All Status" );
  const [ selectedBook, setSelectedBook ] = useState<CambridgeBook | null>( null );
  const [ selectedTest, setSelectedTest ] = useState<CambridgeTest | null>( null );
  const [ modalOpen, setModalOpen ] = useState( false );

  const bookFilterOptions = useMemo( () => {
    return [ "All Books", ...books.map( ( book ) => book.title ) ];
  }, [] );

  const filteredBooks = useMemo( () => {
    return books
      .map( ( book ) => {
        const matchesBook =
          bookFilter === "All Books" || book.title === bookFilter;

        const filteredTests = book.tests.filter( ( test ) => {
          const matchesSearch =
            book.title.toLowerCase().includes( searchQuery.toLowerCase() ) ||
            test.title.toLowerCase().includes( searchQuery.toLowerCase() ) ||
            book.label.toLowerCase().includes( searchQuery.toLowerCase() );

          const normalizedStatus = statusFilter
            .toLowerCase()
            .replaceAll( " ", "-" );

          const matchesStatus =
            statusFilter === "All Status" || test.status === normalizedStatus;

          return matchesSearch && matchesStatus;
        } );

        return {
          ...book,
          tests: matchesBook ? filteredTests : [],
        };
      } )
      .filter( ( book ) => book.tests.length > 0 );
  }, [ searchQuery, bookFilter, statusFilter ] );

  const totalTests = books.reduce( ( sum, book ) => sum + book.tests.length, 0 );

  const completedTests = books.reduce(
    ( sum, book ) =>
      sum + book.tests.filter( ( test ) => test.status === "completed" ).length,
    0
  );

  const inProgressTests = books.reduce(
    ( sum, book ) =>
      sum + book.tests.filter( ( test ) => test.status === "in-progress" ).length,
    0
  );

  function handleSelectTest ( book: CambridgeBook, test: CambridgeTest ) {
    setSelectedBook( book );
    setSelectedTest( test );
    setModalOpen( true );
  }

  function handleStartTest ( payload: {
    book: CambridgeBook;
    test: CambridgeTest;
    mode: TestMode;
    modules: SelectedModule[];
  } ) {
    const query = new URLSearchParams( {
      book: payload.book.id,
      test: payload.test.id,
      mode: payload.mode,
      modules: payload.modules.join( "," ),
    } );

    window.location.href = `/dashboard/mock-test/test-center?${ query.toString() }`;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 space-y-8 duration-500">
      <LibraryHero />

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <LibraryStat
          icon={ BookOpen }
          title="Available Tests"
          value={ `${ totalTests }` }
          subtitle="Cambridge 20 to 5"
          color="blue"
        />

        <LibraryStat
          icon={ CheckCircle2 }
          title="Completed"
          value={ `${ completedTests }` }
          subtitle="Tests reviewed"
          color="green"
        />

        <LibraryStat
          icon={ Clock }
          title="In Progress"
          value={ `${ inProgressTests }` }
          subtitle="Continue anytime"
          color="purple"
        />

        <LibraryStat
          icon={ GraduationCap }
          title="Target"
          value="Band 7+"
          subtitle="Exam simulation"
          color="cyan"
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_220px_220px]">
          <div className="relative">
            <Search
              size={ 18 }
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={ searchQuery }
              onChange={ ( event ) => setSearchQuery( event.target.value ) }
              placeholder="Search Cambridge book or test..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-blue-950"
            />
          </div>

          <div className="relative">
            <Filter
              size={ 18 }
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={ bookFilter }
              onChange={ ( event ) => setBookFilter( event.target.value ) }
              className="w-full cursor-pointer appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-950"
            >
              { bookFilterOptions.map( ( book ) => (
                <option key={ book }>{ book }</option>
              ) ) }
            </select>
          </div>

          <select
            value={ statusFilter }
            onChange={ ( event ) => setStatusFilter( event.target.value ) }
            className="w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-950"
          >
            <option>All Status</option>
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </section>

      <section className="space-y-10">
        { filteredBooks.map( ( book ) => (
          <CambridgeBookCard
            key={ book.id }
            book={ book }
            onSelectTest={ handleSelectTest }
          />
        ) ) }

        { filteredBooks.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-xl font-black text-slate-950 dark:text-white">
              No tests found
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        ) }
      </section>

      <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/20">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          Next Development Step
        </h2>

        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
          The library now includes Cambridge 20 down to Cambridge 5. Next, we
          should create the real computer-based IELTS test center page with
          split-screen questions, timer, answers, section navigation, result,
          and review mistakes.
        </p>

        <Button className="mt-5">Create Test Center Next</Button>
      </section>

      <TestModeModal
        open={ modalOpen }
        book={ selectedBook }
        test={ selectedTest }
        onClose={ () => setModalOpen( false ) }
        onStart={ handleStartTest }
      />
    </div>
  );
}

function LibraryHero () {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
            <Sparkles size={ 16 } />
            Computer-Based IELTS Practice
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Cambridge Test Library
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
            Choose a Cambridge-style IELTS test, select practice or exam mode,
            complete modules, then review your mistakes and results.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <HeroStat icon={ Headphones } label="Listening" value="40 Qs" />
          <HeroStat icon={ BookOpen } label="Reading" value="40 Qs" />
          <HeroStat icon={ PenLine } label="Writing" value="2 Tasks" />
          <HeroStat icon={ Mic } label="Speaking" value="3 Parts" />
        </div>
      </div>
    </section>
  );
}

function HeroStat ( {
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
} ) {
  return (
    <div className="rounded-2xl bg-white/15 p-4 backdrop-blur transition hover:scale-[1.02]">
      <Icon size={ 22 } className="text-blue-100" />

      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-blue-100">
        { label }
      </p>

      <p className="mt-1 text-2xl font-black text-white">{ value }</p>
    </div>
  );
}

function LibraryStat ( {
  icon: Icon,
  title,
  value,
  subtitle,
  color,
}: {
  icon: typeof BookOpen;
  title: string;
  value: string;
  subtitle: string;
  color: "blue" | "green" | "purple" | "cyan";
} ) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300",
    green:
      "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-300",
    purple:
      "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-300",
    cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300",
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            { title }
          </p>

          <h3 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
            { value }
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            { subtitle }
          </p>
        </div>

        <div
          className={ `rounded-2xl p-3 transition group-hover:scale-110 ${ colors[ color ] }` }
        >
          <Icon size={ 24 } />
        </div>
      </div>
    </div>
  );
}