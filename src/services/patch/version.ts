const parseVersion = (version: string) => {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version)
  if (!match) throw new Error(`Ungültige Versionsnummer: ${version}`)
  return match.slice(1).map(Number)
}

export function compareVersions(first: string, second: string) {
  const left = parseVersion(first)
  const right = parseVersion(second)
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index]
  }
  return 0
}

export function canApplyPatch(
  installedVersion: string,
  patch: { fromVersion: string; toVersion: string; minimumAppVersion: string },
) {
  return (
    compareVersions(installedVersion, patch.fromVersion) === 0 &&
    compareVersions(installedVersion, patch.minimumAppVersion) >= 0 &&
    compareVersions(patch.toVersion, installedVersion) > 0
  )
}
