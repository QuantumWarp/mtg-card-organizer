FROM mcr.microsoft.com/dotnet/core/aspnet:2.1-alpine
WORKDIR /app
COPY dist/ .
ENTRYPOINT ["dotnet", "MtgCardOrganizer.Api.dll"]
