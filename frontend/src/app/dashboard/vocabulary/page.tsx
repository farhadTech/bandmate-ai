"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import VocabularyHeader from "@/components/vocabulary/VocabularyHeader";
import VocabularyStats from "@/components/vocabulary/VocabularyStats";
import VocabularyCard, {
  VocabularyWord,
} from "@/components/vocabulary/VocabularyCard";
import PhraseBank from "@/components/vocabulary/PhraseBank";
import AIWordRecommendations from "@/components/vocabulary/AIWordRecommendations";

const initialWords: VocabularyWord[] = [
  {
    id: 1,
    word: "beneficial",
    meaning: "having a good or helpful effect",
    example:
      "Regular exercise is beneficial for both physical and mental health.",
    difficulty: "Easy",
    category: "General",
    status: "Learned",
  },
  {
    id: 2,
    word: "significant",
    meaning: "important or large enough to be noticed",
    example:
      "Technology has had a significant impact on the way people communicate.",
    difficulty: "Medium",
    category: "Writing",
    status: "Learning",
  },
  {
    id: 3,
    word: "inevitable",
    meaning: "certain to happen and impossible to avoid",
    example:
      "Some people believe that automation is an inevitable part of modern life.",
    difficulty: "Medium",
    category: "Academic",
    status: "Review",
  },
  {
    id: 4,
    word: "sustainable",
    meaning: "able to continue without damaging the environment",
    example:
      "Governments should encourage sustainable forms of transportation.",
    difficulty: "Hard",
    category: "Writing",
    status: "Learning",
  },
  {
    id: 5,
    word: "practical",
    meaning: "useful and suitable for real situations",
    example:
      "This solution is practical because it can be applied in most cities.",
    difficulty: "Easy",
    category: "Speaking",
    status: "Learned",
  },
];

export default function VocabularyPage () {
  const [ words, setWords ] = useState<VocabularyWord[]>( initialWords );
  const [ searchQuery, setSearchQuery ] = useState( "" );
  const [ difficultyFilter, setDifficultyFilter ] = useState( "All" );
  const [ statusFilter, setStatusFilter ] = useState( "All" );

  const filteredWords = useMemo( () => {
    return words.filter( ( item ) => {
      const matchesSearch =
        item.word.toLowerCase().includes( searchQuery.toLowerCase() ) ||
        item.meaning.toLowerCase().includes( searchQuery.toLowerCase() ) ||
        item.example.toLowerCase().includes( searchQuery.toLowerCase() );

      const matchesDifficulty =
        difficultyFilter === "All" || item.difficulty === difficultyFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesDifficulty && matchesStatus;
    } );
  }, [ words, searchQuery, difficultyFilter, statusFilter ] );

  const learnedWords = words.filter( ( word ) => word.status === "Learned" ).length;
  const reviewWords = words.filter( ( word ) => word.status === "Review" ).length;

  function handleToggleStatus ( id: number ) {
    setWords( ( prev ) =>
      prev.map( ( word ) => {
        if ( word.id !== id ) return word;

        return {
          ...word,
          status: word.status === "Learned" ? "Review" : "Learned",
        };
      } )
    );
  }

  function handleDelete ( id: number ) {
    setWords( ( prev ) => prev.filter( ( word ) => word.id !== id ) );
  }

  function handleAddDemoWord () {
    const nextId = Date.now();

    setWords( ( prev ) => [
      {
        id: nextId,
        word: "noteworthy",
        meaning: "important or interesting enough to notice",
        example:
          "It is noteworthy that many students now prefer online learning.",
        difficulty: "Medium",
        category: "Academic",
        status: "Learning",
      },
      ...prev,
    ] );
  }

  function handleAddRecommendation ( item: {
    word: string;
    meaning: string;
    example: string;
  } ) {
    const exists = words.some(
      ( word ) => word.word.toLowerCase() === item.word.toLowerCase()
    );

    if ( exists ) return;

    setWords( ( prev ) => [
      {
        id: Date.now(),
        word: item.word,
        meaning: item.meaning,
        example: item.example,
        difficulty: "Medium",
        category: "Writing",
        status: "Learning",
      },
      ...prev,
    ] );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 space-y-8 duration-500">
      <VocabularyHeader onAddWord={ handleAddDemoWord } />

      <VocabularyStats
        totalWords={ words.length }
        learnedWords={ learnedWords }
        reviewWords={ reviewWords }
      />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_180px_180px]">
              <div className="relative">
                <Search
                  size={ 18 }
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={ searchQuery }
                  onChange={ ( event ) => setSearchQuery( event.target.value ) }
                  placeholder="Search words, meanings, or examples..."
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-cyan-950"
                />
              </div>

              <select
                value={ difficultyFilter }
                onChange={ ( event ) => setDifficultyFilter( event.target.value ) }
                className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-950"
              >
                <option>All</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

              <select
                value={ statusFilter }
                onChange={ ( event ) => setStatusFilter( event.target.value ) }
                className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-950"
              >
                <option>All</option>
                <option>Learning</option>
                <option>Learned</option>
                <option>Review</option>
              </select>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <h2 className="text-xl font-black text-slate-950 dark:text-white">
                Saved Words
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                { filteredWords.length } word(s) found.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              { filteredWords.map( ( word ) => (
                <VocabularyCard
                  key={ word.id }
                  word={ word }
                  onToggleStatus={ handleToggleStatus }
                  onDelete={ handleDelete }
                />
              ) ) }
            </div>

            { filteredWords.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
                <h3 className="text-xl font-black text-slate-950 dark:text-white">
                  No words found
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Try changing your search or filters.
                </p>
              </div>
            ) }
          </div>
        </div>

        <div className="space-y-6">
          <AIWordRecommendations onAddRecommendation={ handleAddRecommendation } />
          <PhraseBank />
        </div>
      </section>
    </div>
  );
}
