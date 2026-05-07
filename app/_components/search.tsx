"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

// 1. Esquema de validação: garante que a busca não vá vazia
const searchSchema = z.object({
  query: z.string().min(1, "Digite algo para buscar"),
})

// Tipagem baseada no esquema
type SearchFormData = z.infer<typeof searchSchema>

export default function SearchBar() {
  const router = useRouter()
  // 2. Inicialização do formulário
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  })

  // 3. Função chamada ao submeter
  const handleSearch = (data: SearchFormData) => {
    router.push(`/barbershops?search=${data.query}`)
  }

  return (
    <div className="py-3">
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="flex gap-2">

        <div className="flex flex-col flex-1">
          <Input
            {...register("query")}
            placeholder="O que você procura?"
          />
        </div>

        <Button type="submit">
          <Search />
        </Button>
      </form>
      {errors.query && (
        <span className="text-red-500 text-sm mt-1">{errors.query.message}</span>
      )}
    </div>
  )
}
